'use client'

import { useState, useEffect } from 'react'
import { localDB, Announcement } from '@/lib/database'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnnouncementBannerProps {
  page: 'homepage' | 'plans' | 'checkout'
}

export default function AnnouncementBanner({ page }: AnnouncementBannerProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [dismissedIds, setDismissedIds] = useState<string[]>([])

  useEffect(() => {
    fetchAnnouncements()
    
    // Load dismissed announcements from localStorage
    const dismissed = localStorage.getItem('dismissedAnnouncements')
    if (dismissed) {
      setDismissedIds(JSON.parse(dismissed))
    }
  }, [page])

  const fetchAnnouncements = async () => {
    try {
      const data = await localDB.fetchActiveAnnouncements(page)
      setAnnouncements(data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    }
  }

  const dismissAnnouncement = (id: string) => {
    const newDismissedIds = [...dismissedIds, id]
    setDismissedIds(newDismissedIds)
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(newDismissedIds))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'error':
        return <XCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800'
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800'
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800'
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800'
    }
  }

  const visibleAnnouncements = announcements.filter(
    announcement => !dismissedIds.includes(announcement.id)
  )

  if (visibleAnnouncements.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {visibleAnnouncements.map((announcement) => (
        <Alert
          key={announcement.id}
          className={cn(
            'relative',
            getAlertClass(announcement.type)
          )}
        >
          <div className="flex items-start space-x-2">
            {getIcon(announcement.type)}
            <div className="flex-1">
              <h4 className="font-semibold">{announcement.title}</h4>
              <AlertDescription className="mt-1">
                {announcement.message}
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissAnnouncement(announcement.id)}
              className="h-6 w-6 p-0 hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  )
}