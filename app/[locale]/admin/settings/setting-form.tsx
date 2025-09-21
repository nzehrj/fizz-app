'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import type { Resolver } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { SettingInputSchema } from '@/lib/validator'
import { ClientSetting, ISettingInput } from '@/types'
import { updateSetting } from '@/lib/actions/setting.actions'
import useSetting from '@/hooks/use-setting-store'
import LanguageForm from './language-form'
import CurrencyForm from './currency-form'
import PaymentMethodForm from './payment-method-form'
import DeliveryDateForm from './delivery-date-form'
import SiteInfoForm from './site-info-form'
import CommonForm from './common-form'
import CarouselForm from './carousel-form'

interface SettingFormProps {
  setting: ISettingInput
}

const SettingForm = ({ setting }: SettingFormProps) => {
  const { setSetting } = useSetting()
  const { toast } = useToast()

  // Fix the typing issue by explicitly casting the resolver
  const form = useForm<ISettingInput>({
    resolver: zodResolver(SettingInputSchema) as Resolver<ISettingInput>,
    defaultValues: setting,
    mode: 'onChange',
  })

  const {
    formState: { isSubmitting },
  } = form

  // Memoized submit handler for better performance
  const onSubmit = useCallback(async (values: ISettingInput) => {
    try {
      const res = await updateSetting({ ...values })
      
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message || 'Failed to update settings',
        })
        return
      }

      // Success case
      toast({
        description: res.message || 'Settings updated successfully',
      })
      
      setSetting(values as ClientSetting)
      
      // Reset form with new values to clear any dirty state
      form.reset(values)
      
    } catch (error) {
      console.error('Settings update error:', error)
      toast({
        variant: 'destructive',
        description: 'An unexpected error occurred while saving settings',
      })
    }
  }, [toast, setSetting, form])

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        method='post'
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <SiteInfoForm 
          id='setting-site-info' 
          form={form} 
        />
        
        <CommonForm 
          id='setting-common' 
          form={form} 
        />
        
        <CarouselForm 
          id='setting-carousels' 
          form={form} 
        />
        
        <LanguageForm 
          id='setting-languages' 
          form={form} 
        />
        
        <CurrencyForm 
          id='setting-currencies' 
          form={form} 
        />
        
        <PaymentMethodForm 
          id='setting-payment-methods' 
          form={form} 
        />
        
        <DeliveryDateForm 
          id='setting-delivery-dates' 
          form={form} 
        />
        
        <div className='pt-4'>
          <Button
            type='submit'
            size='lg'
            disabled={isSubmitting}
            className='w-full mb-24'
            aria-label={isSubmitting ? 'Saving settings...' : 'Save settings'}
          >
            {isSubmitting ? 'Submitting...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingForm