import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Verify request is authorized
    const apiKey = request.headers.get('x-api-key')
    
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projectId = process.env.VERCEL_PROJECT_ID
    const teamId = process.env.VERCEL_TEAM_ID
    const token = process.env.VERCEL_API_TOKEN

    if (!projectId || !teamId || !token) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      )
    }

    // Calculate date range (last 30 days)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)

    const since = startDate.getTime()
    const until = endDate.getTime()

    // Fetch analytics data from Vercel API
    const analyticsUrl = `https://api.vercel.com/v1/analytics?projectId=${projectId}&teamId=${teamId}&since=${since}&until=${until}`
    
    console.log('Fetching analytics from:', analyticsUrl)

    const analyticsResponse = await fetch(analyticsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!analyticsResponse.ok) {
      console.error('Analytics API error:', analyticsResponse.status, analyticsResponse.statusText)
      const errorText = await analyticsResponse.text()
      console.error('Error response:', errorText)
      return NextResponse.json(
        { 
          error: 'Failed to fetch analytics data',
          status: analyticsResponse.status,
          statusText: analyticsResponse.statusText,
          details: errorText
        },
        { status: 500 }
      )
    }

    const analyticsData = await analyticsResponse.json()

    // Fetch speed insights data
    const speedInsightsUrl = `https://api.vercel.com/v1/speed-insights?projectId=${projectId}&teamId=${teamId}&since=${since}&until=${until}`
    
    let speedInsightsData = null
    try {
      const speedResponse = await fetch(speedInsightsUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (speedResponse.ok) {
        speedInsightsData = await speedResponse.json()
      } else {
        console.warn('Speed insights API error:', speedResponse.status, speedResponse.statusText)
      }
    } catch (speedError) {
      console.warn('Failed to fetch speed insights:', speedError)
    }

    // Return combined data
    return NextResponse.json({
      success: true,
      data: {
        analytics: analyticsData,
        speedInsights: speedInsightsData,
        dateRange: {
          from: startDate.toISOString(),
          to: endDate.toISOString(),
        }
      },
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Optional: Add a POST method for custom date ranges
export async function POST(request: NextRequest) {
  try {
    // Verify request is authorized
    const apiKey = request.headers.get('x-api-key')
    
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { since, until } = body

    const projectId = process.env.VERCEL_PROJECT_ID
    const teamId = process.env.VERCEL_TEAM_ID
    const token = process.env.VERCEL_API_TOKEN

    if (!projectId || !teamId || !token) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      )
    }

    // Use provided date range or default to last 30 days
    const endTime = until || Date.now()
    const startTime = since || (endTime - (30 * 24 * 60 * 60 * 1000))

    // Fetch analytics data
    const analyticsUrl = `https://api.vercel.com/v1/analytics?projectId=${projectId}&teamId=${teamId}&since=${startTime}&until=${endTime}`
    
    const analyticsResponse = await fetch(analyticsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!analyticsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch analytics data' },
        { status: 500 }
      )
    }

    const analyticsData = await analyticsResponse.json()

    return NextResponse.json({
      success: true,
      data: {
        analytics: analyticsData,
        dateRange: {
          from: new Date(startTime).toISOString(),
          to: new Date(endTime).toISOString(),
        }
      },
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}