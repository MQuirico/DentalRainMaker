'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Calendar, SmileIcon as Tooth } from 'lucide-react'
import BeatLoader from 'react-spinners/BeatLoader'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Treatment {
  id: string
  date: string
  procedure: string
  tooth: string
  dentist: string
  notes: string
  cost: number
}

const mockTreatments: Treatment[] = [
  {
    id: '1',
    date: '2024-01-15',
    procedure: 'Root Canal',
    tooth: '16',
    dentist: 'Dr. Smith',
    notes: 'Successful procedure, follow-up in 2 weeks',
    cost: 800,
  },
  {
    id: '2',
    date: '2023-12-20',
    procedure: 'Dental Cleaning',
    tooth: 'All',
    dentist: 'Dr. Johnson',
    notes: 'Regular cleaning, no issues found',
    cost: 150,
  },
  // Add more mock treatments as needed
]

export default function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setTreatments(mockTreatments)
      setLoading(false)
    }, 2000) // 2000 milliseconds = 2 seconds
  }, [])

  return (
    <div className='absolute left-0 mx-auto p-6 lg:w-[100%]'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex w-[100%] flex-col items-center'>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Treatment Records
          </h1>
          <p className='mt-1 text-gray-500'>
            View and manage patient treatment history
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <Card className='mb-6'>
        <CardContent className='p-4'>
          <div className='r flex flex-col flex-wrap items-center gap-4 md:flex-row md:content-center'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 -translate-y-1/2 transform text-gray-400 md:w-[90%]' />
                <Input
                  placeholder='Search treatments...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 md:w-[60%]'
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className='w-[100%] lg:max-w-[30%]'>
                <SelectValue placeholder='Filter by Procedure' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Procedures</SelectItem>
                <SelectItem value='cleaning'>Cleaning</SelectItem>
                <SelectItem value='rootcanal'>Root Canal</SelectItem>
                <SelectItem value='filling'>Filling</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className='w-[100%] lg:max-w-[30%]'>
                <SelectValue placeholder='Filter by Dentist' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Dentists</SelectItem>
                <SelectItem value='smith'>Dr. Smith</SelectItem>
                <SelectItem value='johnson'>Dr. Johnson</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant='outline'
              className='flex w-[60%] flex-col items-center gap-2 self-center md:absolute md:left-[15%] md:top-[35%] md:flex-row'
            >
              <Filter className='h-4 w-4' />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className='flex flex-col space-y-4'>
        {loading ? (
          <BeatLoader color='blue' className='self-center' />
        ) : (
          treatments.map((treatment) => (
            <Card
              key={treatment.id}
              className='transition-colors hover:bg-gray-50'
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start gap-4'>
                    <div className='rounded-lg bg-blue-100 p-3'>
                      <Tooth className='h-6 w-6 text-blue-600' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {treatment.procedure}
                      </h3>
                      <div className='mt-1 flex items-center gap-2 text-sm text-gray-500'>
                        <Calendar className='h-4 w-4' />
                        {new Date(treatment.date).toLocaleDateString()}
                      </div>
                      <p className='mt-2 text-sm text-gray-600'>
                        {treatment.notes}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-gray-900'>
                      ${treatment.cost}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Tooth: {treatment.tooth}
                    </p>
                    <p className='text-sm text-gray-500'>{treatment.dentist}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
