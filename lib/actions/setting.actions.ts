// lib/actions/setting.actions.ts
'use server'

import { ISettingInput } from '@/types'
import Setting from '../db/models/setting.model'
import { connectToDatabase } from '../db'
import { formatError } from '../utils'
import { cookies } from 'next/headers'

const globalForSettings = global as unknown as {
  cachedSettings: ISettingInput | null
}

export const getSetting = async (): Promise<ISettingInput> => {
  if (!globalForSettings.cachedSettings) {
    await connectToDatabase()
    const setting = await Setting.findOne().lean()
    globalForSettings.cachedSettings = setting
      ? JSON.parse(JSON.stringify(setting))
      : null
  }
  return globalForSettings.cachedSettings!
}

export const updateSetting = async (newSetting: ISettingInput) => {
  try {
    await connectToDatabase()

    const completeSetting: ISettingInput = {
      common: {
        pageSize: newSetting.common?.pageSize ?? 9,
        isMaintenanceMode: newSetting.common?.isMaintenanceMode ?? false,
        freeShippingMinPrice: newSetting.common?.freeShippingMinPrice ?? 0,
        defaultTheme: newSetting.common?.defaultTheme ?? 'light',
        defaultColor: newSetting.common?.defaultColor ?? 'gold',
      },
      site: {
        name: newSetting.site?.name ?? '',
        url: newSetting.site?.url ?? '',
        logo: newSetting.site?.logo ?? '',
        slogan: newSetting.site?.slogan ?? '',
        description: newSetting.site?.description ?? '',
        keywords: newSetting.site?.keywords ?? '',
        email: newSetting.site?.email ?? '',
        phone: newSetting.site?.phone ?? '',
        author: newSetting.site?.author ?? '',
        copyright: newSetting.site?.copyright ?? '',
        address: newSetting.site?.address ?? '',
      },
      carousels: newSetting.carousels ?? [],
      availableLanguages: newSetting.availableLanguages ?? [],
      defaultLanguage: newSetting.defaultLanguage ?? '',
      availableCurrencies: newSetting.availableCurrencies ?? [],
      defaultCurrency: newSetting.defaultCurrency ?? '',
      availablePaymentMethods: newSetting.availablePaymentMethods ?? [],
      defaultPaymentMethod: newSetting.defaultPaymentMethod ?? '',
      availableDeliveryDates: newSetting.availableDeliveryDates ?? [],
      defaultDeliveryDate: newSetting.defaultDeliveryDate ?? '',
    }

    const existing = await Setting.findOne()
    let updatedSetting

    if (existing) {
      updatedSetting = await Setting.findOneAndUpdate({}, { $set: completeSetting }, {
        new: true,
        runValidators: true,
      }).lean()
    } else {
      updatedSetting = await Setting.create(completeSetting)
    }

    globalForSettings.cachedSettings = JSON.parse(JSON.stringify(updatedSetting))

    return {
      success: true,
      message: 'Setting updated successfully!',
    }
  } catch (error) {
    console.error('❌ Setting update error:', error)
    return { success: false, message: formatError(error) }
  }
}

export const setCurrencyOnServer = async (newCurrency: string) => {
  const cookiesStore = await cookies() // FIX: added await
  cookiesStore.set('currency', newCurrency)

  return {
    success: true,
    message: 'Currency updated successfully',
  }
}
