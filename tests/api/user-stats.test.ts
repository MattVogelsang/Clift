import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mockCookies = vi.hoisted(() => vi.fn())
vi.mock('next/headers', () => ({
  cookies: mockCookies,
}))

const mockAuthGetUser = vi.hoisted(() => vi.fn())
const mockFrom = vi.hoisted(() => vi.fn())

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: mockAuthGetUser,
    },
    from: mockFrom,
  })),
}))

// Import after mocks
import { GET } from '@/app/api/user/stats/route'

const buildStatsQuery = (data: any) => {
  const query: any = {}
  query.select = vi.fn().mockReturnValue(query)
  query.eq = vi.fn().mockReturnValue(query)
  query.single = vi.fn().mockResolvedValue({ data })
  return query
}

const buildApplicationsQuery = (data: any, error: any = null) => {
  const query: any = {}
  query.select = vi.fn().mockReturnValue(query)
  query.eq = vi.fn().mockReturnValue(query)
  query.gte = vi.fn().mockReturnValue(query)
  query.order = vi.fn().mockResolvedValue({ data, error })
  return query
}

describe('/api/user/stats GET', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-31T12:00:00Z'))
    mockCookies.mockResolvedValue({ get: vi.fn() })
    mockAuthGetUser.mockReset()
    mockFrom.mockReset()
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key'
  })

  it('returns 401 when user is not authenticated', async () => {
    mockAuthGetUser.mockResolvedValue({
      data: { user: null },
      error: new Error('No user'),
    })

    const request = new NextRequest('http://localhost/api/user/stats')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
  })

  it('returns aggregated stats when user is authenticated', async () => {
    mockAuthGetUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    })

    const statsResponse = {
      total_applications: 12,
      profile_views: 7,
      responses: 3,
      offers: 1,
      response_rate: 25,
    }

    const applicationsResponse = [
      {
        id: 'app-1',
        status: 'response',
        applied_at: '2024-01-25T10:00:00Z',
        job_listings: { company: 'OpenAI', title: 'Engineer', match_score: 82 },
      },
      {
        id: 'app-2',
        status: 'applied',
        applied_at: '2024-01-18T10:00:00Z',
        job_listings: { company: 'Google', title: 'SWE', match_score: 70 },
      },
      {
        id: 'app-3',
        status: 'viewed',
        applied_at: '2024-01-12T10:00:00Z',
        job_listings: { company: 'OpenAI', title: 'Engineer', match_score: 90 },
      },
    ]

    mockFrom.mockImplementation((table: string) => {
      if (table === 'user_application_stats') {
        return buildStatsQuery(statsResponse)
      }
      if (table === 'applications') {
        return buildApplicationsQuery(applicationsResponse)
      }
      throw new Error(`Unhandled table ${table}`)
    })

    const request = new NextRequest('http://localhost/api/user/stats?range=30d')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toMatchObject({
      totalApplications: 12,
      profileViews: 7,
      responses: 3,
      offers: 1,
      responseRate: 25,
      averageMatchScore: 81, // rounded average of 82,70,90
      applications: applicationsResponse,
    })
    expect(body.topCompanies[0]).toMatchObject({
      name: 'OpenAI',
      applications: 2,
    })
    expect(body.weeklyData.length).toBeGreaterThan(0)
  })
})

