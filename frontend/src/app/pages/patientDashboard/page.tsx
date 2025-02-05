'use client'

import { Metadata } from 'next'
import { useSelector } from 'react-redux'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'
import { AppointmentList } from '@/components/patientDashboard/appointment-list'
import { TreatmentProgress } from '@/components/patientDashboard/components_treatment-progress'
import { MetricsCards } from '@/components/patientDashboard/components_metrics-cards'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'

const metadata: Metadata = {
  title: 'Dashboard | Dental Rain Maker',
  description: 'Manage your dental care and appointments',
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const { family_name } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])

  return (
    <div className='absolute left-3 right-0 top-[15vh] overflow-y-scroll lg:left-0 lg:top-[10vh] lg:max-w-[100%]'>
      <DashboardHeader
        loading={loading}
        heading={`Welcome back, ${family_name}`}
        text='Manage your dental care journey'
      />
      <div className='grid gap-6 overflow-y-scroll'>
        <MetricsCards />
        <div className='grid gap-6 md:grid-cols-2'>
          <AppointmentList />
          <TreatmentProgress />
        </div>
      </div>
    </div>
  )
}
