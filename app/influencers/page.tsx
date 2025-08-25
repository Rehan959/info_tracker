"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, ExternalLink, TrendingUp, Users, Instagram, Youtube, Linkedin, Twitter, Loader2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface Influencer {
  id: string
  name: string
  username: string
  platform: string
  followers: number
  engagement: number
  bio: string | null
  profileUrl: string | null
  isActive: boolean
  createdAt: string
}

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editing, setEditing] = useState<Influencer | null>(null)
  const [editFollowers, setEditFollowers] = useState<string>('')
  const [editEngagement, setEditEngagement] = useState<string>('')
  const [editBio, setEditBio] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Fetch influencers from API
  useEffect(() => {
    fetchInfluencers()
  }, [])

  // Filter influencers when search or filters change
  useEffect(() => {
    filterInfluencers()
  }, [influencers, searchTerm, platformFilter, statusFilter])

  const fetchInfluencers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/influencers', { redirect: 'manual' })
      if (response.ok) {
        const data = await response.json()
        setInfluencers(data.influencers)
      } else if (response.status === 401 || response.status === 0) {
        // Fallback to demo influencers when unauthorized
        const demoRes = await fetch('/api/demo-influencers')
        if (demoRes.ok) {
          const demo = await demoRes.json()
          // Demo endpoint returns { success, influencers }
          setInfluencers(Array.isArray(demo) ? demo : (demo.influencers ?? []))
        } else {
          console.error('Failed to fetch demo influencers')
        }
      } else {
        console.error('Failed to fetch influencers')
      }
    } catch (error) {
      console.error('Error fetching influencers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterInfluencers = () => {
    let filtered = [...influencers]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(influencer =>
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (influencer.bio && influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Platform filter
    if (platformFilter !== 'all') {
      filtered = filtered.filter(influencer =>
        influencer.platform.toLowerCase() === platformFilter.toLowerCase()
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(influencer => influencer.isActive)
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(influencer => !influencer.isActive)
      }
    }

    setFilteredInfluencers(filtered)
  }

  const deleteInfluencer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this influencer?')) return

    try {
      const response = await fetch(`/api/influencers/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setInfluencers(influencers.filter(influencer => influencer.id !== id))
      } else {
        console.error('Failed to delete influencer')
      }
    } catch (error) {
      console.error('Error deleting influencer:', error)
    }
  }

  function getPlatformIcon(platform: string) {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "twitter_x":
      case "twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  function getStatusColor(isActive: boolean) {
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  function getStatusText(isActive: boolean) {
    return isActive ? "Active" : "Inactive"
  }

  function formatFollowers(followers: number) {
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + 'M'
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + 'K'
    }
    return followers.toString()
  }

  function openEdit(influencer: Influencer) {
    setEditing(influencer)
    setEditFollowers(String(influencer.followers || ''))
    setEditEngagement(String(influencer.engagement || ''))
    setEditBio(influencer.bio || '')
    setSaveError(null)
    setIsEditOpen(true)
  }

  async function saveEdit() {
    if (!editing) return

    // Demo data doesn't have IDs in DB; guard
    const isDemo = !editing.id || editing.id.startsWith('demo_')

    if (isDemo) {
      // Update only in UI for demo visitors
      const updated: Influencer = {
        ...editing,
        followers: Math.max(0, Math.floor(Number(editFollowers) || 0)),
        engagement: Math.max(0, Number(editEngagement) || 0),
        bio: editBio,
      }
      setInfluencers(prev => prev.map(i => i.id === editing.id ? updated : i))
      setIsEditOpen(false)
      return
    }

    try {
      setSaving(true)
      setSaveError(null)
      const res = await fetch(`/api/influencers/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followers: Math.max(0, Math.floor(Number(editFollowers) || 0)),
          engagement: Math.max(0, Number(editEngagement) || 0),
          bio: editBio,
          // keep existing identity fields intact in case the API expects them
          name: editing.name,
          username: editing.username,
          platform: editing.platform,
        })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to update influencer')
      }
      const updated = await res.json()
      setInfluencers(prev => prev.map(i => i.id === editing.id ? { ...i, ...updated } : i))
      setIsEditOpen(false)
    } catch (e: any) {
      setSaveError(e.message || 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation title="Influencers" />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Influencers" />
      
      {/* Main Content */}
      <main className="p-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search influencers..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter_x">Twitter/X</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredInfluencers.length} of {influencers.length} influencers
        </div>

        {/* Influencers Grid */}
        {filteredInfluencers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No influencers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || platformFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search terms'
                : 'Get started by adding your first influencer'
              }
            </p>
            <Link href="/add-influencer">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Influencer
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers.map((influencer) => (
              <Card key={influencer.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {influencer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{influencer.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          {getPlatformIcon(influencer.platform)}
                          @{influencer.username}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(influencer.isActive)} variant="secondary">
                      {getStatusText(influencer.isActive)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Followers</p>
                      <p className="font-medium">{formatFollowers(influencer.followers)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-medium">{influencer.engagement.toFixed(1)}%</p>
                    </div>
                  </div>
                  {influencer.bio && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Bio</p>
                      <p className="font-medium truncate">{influencer.bio}</p>
                    </div>
                  )}
                  <div className="text-sm">
                    <p className="text-muted-foreground">Platform</p>
                    <p className="font-medium capitalize">{influencer.platform.replace('_', ' ')}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Added</p>
                    <p className="font-medium">
                      {new Date(influencer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {influencer.profileUrl && (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <a href={influencer.profileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => openEdit(influencer)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteInfluencer(influencer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Influencer</DialogTitle>
            <DialogDescription>Manually update follower count and details.</DialogDescription>
          </DialogHeader>

          {saveError && (
            <div className="text-red-600 text-sm mb-2">{saveError}</div>
          )}

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="followers" className="text-right">Followers</Label>
              <Input id="followers" className="col-span-3" type="number" min={0} value={editFollowers} onChange={(e) => setEditFollowers(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="engagement" className="text-right">Engagement %</Label>
              <Input id="engagement" className="col-span-3" type="number" min={0} step={0.1} value={editEngagement} onChange={(e) => setEditEngagement(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
              <Textarea id="bio" className="col-span-3" value={editBio} onChange={(e) => setEditBio(e.target.value)} />
            </div>
            {editing && (
              <div className="flex justify-end">
                <Button variant="outline" onClick={async () => {
                  try {
                    setSaving(true)
                    const res = await fetch(`/api/influencers/${editing.id}/refresh`, { method: 'GET' })
                    if (!res.ok) throw new Error('Failed to refresh followers')
                    const data = await res.json()
                    const updated = data?.influencer
                    if (updated?.followers != null) {
                      setEditFollowers(String(updated.followers))
                      setInfluencers(prev => prev.map(i => i.id === updated.id ? { ...i, followers: updated.followers } : i))
                    }
                  } catch (e: any) {
                    setSaveError(e.message || 'Refresh failed')
                  } finally {
                    setSaving(false)
                  }
                }} disabled={saving}>
                  {saving ? 'Refreshing…' : 'Refresh from Source'}
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
