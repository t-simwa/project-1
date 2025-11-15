# Project 3: InsightFlow - Advanced SaaS Analytics Platform (Capstone)

## 1. Project Name & Category

**Project Name:** InsightFlow (or "FeedbackHub" / "CustomerInsight")

**Category:** Customer Experience Analytics & Business Intelligence SaaS

**Tagline:** "Transform Customer Feedback into Actionable Business Insights"

---

## 2. Problem Statement & Value Proposition

### The Real-World Problem

Small to medium-sized businesses (SMBs) struggle with customer feedback management because:

1. **Feedback Fragmentation:** Customer feedback exists across multiple channels (Google Reviews, social media, support tickets, surveys, emails) with no unified view
2. **Lack of Actionable Insights:** Businesses collect feedback but don't know how to analyze it or what actions to take
3. **Expensive Solutions:** Enterprise tools like Qualtrics, Medallia cost $10,000+/year, making them unaffordable for SMBs
4. **No Sentiment Analysis:** Manual review of feedback is time-consuming and subjective
5. **Missing Trend Analysis:** Can't identify patterns, recurring issues, or improvement opportunities over time
6. **Poor ROI Tracking:** Can't measure impact of changes made based on feedback
7. **No Competitive Intelligence:** Can't compare their feedback metrics against industry benchmarks

### Why International Employers Will Be Impressed

1. **Enterprise-Grade SaaS:** Demonstrates ability to build complex, scalable SaaS platforms
2. **Data Engineering:** Shows understanding of data aggregation, processing, and visualization
3. **AI/ML Integration:** Sentiment analysis and NLP demonstrate modern tech capabilities
4. **API Integration Expertise:** Multiple third-party API integrations (Google, social media, etc.)
5. **Advanced Analytics:** Complex data visualization and business intelligence features
6. **Product Thinking:** Understanding of customer experience and business metrics
7. **Scalability Architecture:** Built to handle large datasets and multiple tenants
8. **Monetization Strategy:** Clear SaaS business model with multiple revenue streams

### What Makes It Stand Out

- **Untapped Niche:** SMBs are underserved in customer experience analytics (enterprise tools too expensive, basic tools too simple)
- **Multi-Channel Aggregation:** Unique value of unifying all feedback sources
- **AI-Powered Insights:** Automated sentiment analysis and trend detection
- **Actionable Intelligence:** Not just data, but recommendations and action items
- **Beautiful Visualizations:** World-class data visualization that rivals enterprise tools
- **White-Label Potential:** Can be rebranded for agencies/consultants
- **High Retention:** Once businesses integrate, high switching costs (data history, workflows)

### Market Opportunity

**Target Market:**
- **Primary:** Small-medium businesses (10-200 employees)
  - E-commerce stores
  - Local service businesses
  - SaaS companies
  - Retail stores
  - Restaurants/hospitality
  
- **Secondary:** Agencies and consultants
  - Marketing agencies managing multiple clients
  - Customer experience consultants
  - Business coaches

**Market Size:**
- Customer experience software market: $10+ billion (growing 15% annually)
- SMB segment: Underserved, represents $2+ billion opportunity
- Growing awareness of customer experience importance
- Increasing online reviews and social media feedback

---

## 3. Core Features (Detailed)

### Data Aggregation & Integration (Week 1)
1. **Multi-Channel Data Collection**
   - **Google Reviews Integration:** OAuth + Google My Business API
   - **Social Media Monitoring:** Twitter, Facebook, Instagram (via APIs)
   - **Support Ticket Integration:** Zendesk, Intercom, Freshdesk APIs
   - **Survey Integration:** Typeform, Google Forms, custom surveys
   - **Email Feedback:** Email parsing and forwarding
   - **Manual Entry:** Allow users to manually add feedback
   - **CSV/Excel Import:** Bulk import historical data
   - **Webhook Support:** Receive feedback from custom integrations

2. **Real-Time Data Sync**
   - Scheduled sync jobs (hourly, daily, weekly)
   - Real-time webhook processing
   - Data deduplication (prevent duplicate feedback)
   - Sync status monitoring and error handling
   - Retry logic for failed syncs

### AI-Powered Analysis (Week 2)
3. **Sentiment Analysis Engine**
   - Natural Language Processing (NLP) for sentiment detection
   - Sentiment scoring (positive, neutral, negative)
   - Emotion detection (happy, frustrated, angry, satisfied)
   - Topic extraction (what customers are talking about)
   - Keyword extraction and frequency analysis
   - Multi-language support (English, Spanish, French initially)

4. **Intelligent Categorization**
   - Auto-categorize feedback by topic (product, service, pricing, support, etc.)
   - Custom category creation and training
   - Tag suggestions based on content
   - Priority scoring (urgent, high, medium, low)
   - Duplicate detection (similar feedback grouping)

5. **Trend Analysis & Predictions**
   - Time-series analysis of sentiment trends
   - Identify recurring issues and patterns
   - Predict churn risk based on feedback patterns
   - Seasonal trend detection
   - Anomaly detection (sudden spikes in negative feedback)

### Analytics Dashboard & Visualization (Week 3)
6. **Executive Dashboard**
   - **Key Metrics Overview:**
     - Overall sentiment score (0-100)
     - Net Promoter Score (NPS) calculation
     - Customer Satisfaction (CSAT) score
     - Feedback volume trends
     - Response rate and time
   - **Real-Time Widgets:**
     - Live feedback feed
     - Sentiment gauge
     - Top issues this week
     - Response time metrics
   - **Comparison Views:**
     - Period-over-period comparison
     - Channel comparison
     - Category comparison
     - Team/Department performance

7. **Advanced Data Visualizations**
   - **Sentiment Over Time:** Line/area charts showing sentiment trends
   - **Feedback Distribution:** Pie/bar charts by channel, category, sentiment
   - **Word Clouds:** Most mentioned topics and keywords
   - **Heatmaps:** Feedback volume and sentiment by day/time
   - **Funnel Analysis:** Customer journey feedback points
   - **Correlation Analysis:** Relationships between metrics
   - **Geographic Maps:** Feedback by location (if available)
   - **Custom Charts:** User-configurable chart builder

8. **Detailed Analytics Reports**
   - **Feedback Explorer:** Searchable, filterable table of all feedback
   - **Sentiment Deep Dive:** Detailed sentiment analysis with examples
   - **Topic Analysis:** Most discussed topics with sentiment breakdown
   - **Channel Performance:** Which channels drive most feedback
   - **Response Analysis:** Response times, response rates, impact
   - **Competitive Benchmarking:** Compare against industry averages (if data available)
   - **Export Reports:** PDF, CSV, Excel export with custom date ranges

### Action Management & Workflows (Week 4)
9. **Action Item Management**
   - Create action items from feedback
   - Assign actions to team members
   - Set due dates and priorities
   - Track action status (open, in progress, completed)
   - Link actions to specific feedback items
   - Action templates for common issues
   - Automated action suggestions based on feedback patterns

10. **Alert & Notification System**
    - **Smart Alerts:**
      - Negative sentiment spike alerts
      - High-priority feedback notifications
      - New feedback from VIP customers
      - Unresolved action items
      - Weekly/monthly summary reports
    - **Notification Channels:**
      - In-app notifications
      - Email notifications
      - Slack/Teams integration
      - SMS alerts (for critical issues)
    - **Customizable Rules:**
      - Set alert thresholds
      - Define alert conditions
      - Choose notification channels

11. **Team Collaboration Features**
    - **Team Workspaces:** Organize by department/team
    - **Comments & Notes:** Add internal notes to feedback
    - **@Mentions:** Tag team members in comments
    - **Activity Log:** Track all actions and changes
    - **Role-Based Permissions:** Admin, Manager, Analyst, Viewer roles
    - **Team Performance Metrics:** Individual and team response metrics

12. **Customer Response Management**
    - **Response Templates:** Pre-written responses for common scenarios
    - **Response Tracking:** Track which feedback received responses
    - **Response Impact:** Measure sentiment change after response
    - **Bulk Actions:** Respond to multiple feedback items
    - **Response Scheduling:** Schedule responses for optimal times
    - **Multi-Channel Response:** Respond directly from platform (where APIs allow)

### Advanced Features
13. **Custom Dashboards & Reports**
    - Drag-and-drop dashboard builder
    - Custom widget creation
    - Save and share dashboards
    - Scheduled report delivery (email)
    - Dashboard templates for different roles

14. **API & Webhooks**
    - RESTful API for data access
    - Webhook endpoints for real-time updates
    - API documentation (Swagger/OpenAPI)
    - API key management
    - Rate limiting and usage tracking

15. **White-Label Options (Premium)**
    - Custom branding (logo, colors)
    - Custom domain
    - Remove InsightFlow branding
    - Custom email templates

---

## 4. Technical Architecture

### Frontend Structure (React + TypeScript)

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── DatePicker.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── EmptyState.tsx
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── AreaChart.tsx
│   │   ├── Heatmap.tsx
│   │   ├── WordCloud.tsx
│   │   ├── GaugeChart.tsx
│   │   ├── FunnelChart.tsx
│   │   └── MapChart.tsx
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx
│   │   ├── MetricCard.tsx
│   │   ├── Widget.tsx
│   │   ├── WidgetBuilder.tsx
│   │   ├── DashboardGrid.tsx
│   │   └── DashboardSettings.tsx
│   ├── feedback/
│   │   ├── FeedbackList.tsx
│   │   ├── FeedbackCard.tsx
│   │   ├── FeedbackDetail.tsx
│   │   ├── FeedbackFilters.tsx
│   │   ├── FeedbackSearch.tsx
│   │   ├── SentimentBadge.tsx
│   │   └── FeedbackTimeline.tsx
│   ├── analytics/
│   │   ├── AnalyticsView.tsx
│   │   ├── SentimentAnalysis.tsx
│   │   ├── TopicAnalysis.tsx
│   │   ├── TrendAnalysis.tsx
│   │   └── ReportBuilder.tsx
│   ├── integrations/
│   │   ├── IntegrationList.tsx
│   │   ├── IntegrationCard.tsx
│   │   ├── IntegrationSetup.tsx
│   │   └── SyncStatus.tsx
│   ├── actions/
│   │   ├── ActionList.tsx
│   │   ├── ActionCard.tsx
│   │   ├── ActionForm.tsx
│   │   └── ActionTimeline.tsx
│   ├── settings/
│   │   ├── SettingsLayout.tsx
│   │   ├── GeneralSettings.tsx
│   │   ├── TeamSettings.tsx
│   │   ├── IntegrationSettings.tsx
│   │   ├── AlertSettings.tsx
│   │   └── BillingSettings.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── MainLayout.tsx
│       └── Navigation.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Feedback.tsx
│   ├── Analytics.tsx
│   ├── Actions.tsx
│   ├── Integrations.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useFeedback.ts
│   ├── useAnalytics.ts
│   ├── useIntegrations.ts
│   ├── useWebSocket.ts
│   ├── useDebounce.ts
│   └── useChart.ts
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── feedbackSlice.ts
│   │   ├── analyticsSlice.ts
│   │   ├── integrationSlice.ts
│   │   ├── dashboardSlice.ts
│   │   └── uiSlice.ts
│   ├── store.ts
│   └── types.ts
├── services/
│   ├── api.ts
│   ├── websocket.ts
│   ├── authService.ts
│   ├── feedbackService.ts
│   ├── analyticsService.ts
│   ├── integrationService.ts
│   └── nlpService.ts
├── utils/
│   ├── validation.ts
│   ├── dateUtils.ts
│   ├── formatUtils.ts
│   ├── chartUtils.ts
│   ├── nlpUtils.ts
│   └── constants.ts
├── types/
│   ├── user.types.ts
│   ├── feedback.types.ts
│   ├── analytics.types.ts
│   ├── integration.types.ts
│   └── common.types.ts
├── lib/
│   ├── nlp/
│   │   ├── sentiment.ts
│   │   ├── topics.ts
│   │   └── keywords.ts
│   └── charts/
│       └── chartConfig.ts
└── App.tsx
```

### Backend API Endpoints (Express + TypeScript)

#### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile
- `POST /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### Feedback Routes (`/api/feedback`)
- `GET /api/feedback` - Get feedback (with filters, pagination, search)
- `GET /api/feedback/:id` - Get single feedback
- `POST /api/feedback` - Create feedback (manual entry)
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback
- `POST /api/feedback/bulk-import` - Bulk import (CSV/Excel)
- `GET /api/feedback/stats` - Get feedback statistics
- `POST /api/feedback/:id/respond` - Add response to feedback
- `POST /api/feedback/:id/action` - Create action from feedback
- `GET /api/feedback/export` - Export feedback (CSV/Excel)

#### Analytics Routes (`/api/analytics`)
- `GET /api/analytics/overview` - Get overview metrics
- `GET /api/analytics/sentiment` - Get sentiment analysis
- `GET /api/analytics/trends` - Get trend data
- `GET /api/analytics/topics` - Get topic analysis
- `GET /api/analytics/channels` - Get channel performance
- `GET /api/analytics/comparison` - Get period comparison
- `GET /api/analytics/predictions` - Get predictions (churn risk, etc.)
- `POST /api/analytics/custom-query` - Custom analytics query

#### Integration Routes (`/api/integrations`)
- `GET /api/integrations` - Get all integrations
- `POST /api/integrations` - Create integration
- `GET /api/integrations/:id` - Get integration details
- `PUT /api/integrations/:id` - Update integration
- `DELETE /api/integrations/:id` - Delete integration
- `POST /api/integrations/:id/sync` - Trigger manual sync
- `GET /api/integrations/:id/status` - Get sync status
- `POST /api/integrations/:id/test` - Test integration connection
- `GET /api/integrations/available` - Get available integration types

#### Action Routes (`/api/actions`)
- `GET /api/actions` - Get actions (with filters)
- `GET /api/actions/:id` - Get single action
- `POST /api/actions` - Create action
- `PUT /api/actions/:id` - Update action
- `DELETE /api/actions/:id` - Delete action
- `PUT /api/actions/:id/status` - Update action status
- `GET /api/actions/stats` - Get action statistics

#### Dashboard Routes (`/api/dashboards`)
- `GET /api/dashboards` - Get user dashboards
- `POST /api/dashboards` - Create dashboard
- `GET /api/dashboards/:id` - Get dashboard
- `PUT /api/dashboards/:id` - Update dashboard
- `DELETE /api/dashboards/:id` - Delete dashboard
- `POST /api/dashboards/:id/widgets` - Add widget
- `PUT /api/dashboards/:id/widgets/:widgetId` - Update widget
- `DELETE /api/dashboards/:id/widgets/:widgetId` - Delete widget

#### Report Routes (`/api/reports`)
- `GET /api/reports` - Get saved reports
- `POST /api/reports` - Create report
- `GET /api/reports/:id` - Get report
- `POST /api/reports/:id/generate` - Generate report (PDF/CSV)
- `POST /api/reports/:id/schedule` - Schedule report delivery
- `DELETE /api/reports/:id` - Delete report

#### Webhook Routes (`/api/webhooks`)
- `POST /api/webhooks/:integrationId` - Receive webhook from integration
- `GET /api/webhooks` - Get webhook logs
- `POST /api/webhooks/test` - Test webhook endpoint

#### API Routes (`/api/api-keys`)
- `GET /api/api-keys` - Get API keys
- `POST /api/api-keys` - Create API key
- `DELETE /api/api-keys/:id` - Revoke API key
- `GET /api/api-keys/:id/usage` - Get API usage stats

### Database Schema (MongoDB with Mongoose + TypeScript)

#### User Model
```typescript
interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  company?: string;
  role: 'owner' | 'admin' | 'manager' | 'analyst' | 'viewer';
  avatar?: string;
  emailVerified: boolean;
  subscription: {
    plan: 'free' | 'starter' | 'professional' | 'enterprise';
    status: 'active' | 'cancelled' | 'past_due';
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  };
  preferences: {
    theme: 'light' | 'dark';
    timezone: string;
    dateFormat: string;
    notifications: NotificationPreferences;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Feedback Model
```typescript
interface IFeedback {
  _id: ObjectId;
  organization: ObjectId; // ref: Organization
  source: 'google' | 'facebook' | 'twitter' | 'instagram' | 'zendesk' | 'intercom' | 'survey' | 'email' | 'manual';
  sourceId?: string; // External ID from source
  channel: string; // Specific channel identifier
  author: {
    name?: string;
    email?: string;
    externalId?: string;
  };
  content: string; // Feedback text
  rating?: number; // 1-5 or 1-10 scale
  sentiment: {
    score: number; // -1 to 1 (negative to positive)
    label: 'positive' | 'neutral' | 'negative';
    confidence: number; // 0 to 1
    emotions?: string[]; // ['happy', 'frustrated', etc.]
  };
  topics: Array<{
    name: string;
    confidence: number;
  }>;
  keywords: string[];
  category?: string; // Custom category
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location?: {
    country?: string;
    city?: string;
    coordinates?: { lat: number; lng: number };
  };
  metadata: {
    [key: string]: any; // Flexible metadata storage
  };
  response?: {
    content: string;
    respondedBy: ObjectId; // ref: User
    respondedAt: Date;
    channel?: string;
  };
  actions: ObjectId[]; // ref: Action[]
  status: 'new' | 'reviewed' | 'resolved' | 'archived';
  assignedTo?: ObjectId; // ref: User
  syncedAt: Date;
  createdAt: Date; // Original feedback date
  importedAt: Date; // When imported to system
  updatedAt: Date;
}
```

#### Integration Model
```typescript
interface IIntegration {
  _id: ObjectId;
  organization: ObjectId; // ref: Organization
  type: 'google_reviews' | 'facebook' | 'twitter' | 'zendesk' | 'intercom' | 'typeform' | 'webhook' | 'email';
  name: string;
  status: 'active' | 'inactive' | 'error';
  config: {
    [key: string]: any; // Integration-specific config
    // e.g., API keys, OAuth tokens, webhook URLs
  };
  syncSettings: {
    frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
    lastSyncAt?: Date;
    nextSyncAt?: Date;
    autoSync: boolean;
  };
  syncHistory: Array<{
    startedAt: Date;
    completedAt?: Date;
    status: 'success' | 'error' | 'partial';
    itemsProcessed: number;
    errors?: string[];
  }>;
  errorLog?: Array<{
    message: string;
    timestamp: Date;
    resolved: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Action Model
```typescript
interface IAction {
  _id: ObjectId;
  organization: ObjectId; // ref: Organization
  title: string;
  description?: string;
  feedback: ObjectId[]; // ref: Feedback[] (can link multiple)
  assignedTo: ObjectId; // ref: User
  createdBy: ObjectId; // ref: User
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  dueDate?: Date;
  completedAt?: Date;
  category?: string;
  tags: string[];
  comments: Array<{
    user: ObjectId; // ref: User
    content: string;
    createdAt: Date;
  }>;
  impact: {
    feedbackCount: number;
    sentimentChange?: number; // Before/after sentiment
    resolvedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Analytics Cache Model (for performance)
```typescript
interface IAnalyticsCache {
  _id: ObjectId;
  organization: ObjectId; // ref: Organization
  queryKey: string; // Unique identifier for query
  queryType: 'overview' | 'sentiment' | 'trends' | 'topics' | 'custom';
  parameters: {
    [key: string]: any; // Query parameters
  };
  data: any; // Cached result
  expiresAt: Date;
  createdAt: Date;
}
```

#### Organization Model
```typescript
interface IOrganization {
  _id: ObjectId;
  name: string;
  slug: string; // URL-friendly identifier
  owner: ObjectId; // ref: User
  members: Array<{
    user: ObjectId; // ref: User
    role: 'owner' | 'admin' | 'manager' | 'analyst' | 'viewer';
    joinedAt: Date;
  }>;
  subscription: {
    plan: 'free' | 'starter' | 'professional' | 'enterprise';
    status: 'active' | 'cancelled' | 'past_due';
    currentPeriodEnd: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
  settings: {
    timezone: string;
    currency: string;
    branding?: {
      logo?: string;
      primaryColor?: string;
      customDomain?: string;
    };
    features: {
      [key: string]: boolean; // Feature flags
    };
  };
  limits: {
    feedbackPerMonth: number;
    integrations: number;
    teamMembers: number;
    storageGB: number;
  };
  usage: {
    feedbackThisMonth: number;
    storageUsed: number;
    apiCallsThisMonth: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Authentication Flow

Similar to P2 but with organization/tenant support:
- User registers → Creates organization (or joins existing)
- JWT includes: userId, organizationId, role
- All API requests scoped to user's organization
- Multi-tenant data isolation

### State Management Approach

**Redux Toolkit (same as P2) but with:**
- More complex state (analytics, integrations, real-time updates)
- Caching strategies for analytics data
- Optimistic updates for better UX
- Real-time state synchronization via WebSockets

### File Storage Strategy

**AWS S3 + CloudFront:**
- User avatars
- Organization logos
- Exported reports (PDF, CSV)
- Imported files (CSV, Excel)
- Chart images (for scheduled reports)

### NLP/Sentiment Analysis Implementation

**Option 1: Natural (Node.js NLP library)**
- Lightweight, runs on server
- Good for basic sentiment analysis
- No external API costs

**Option 2: Google Cloud Natural Language API**
- More accurate
- Better multi-language support
- Pay-per-use pricing

**Option 3: AWS Comprehend**
- Enterprise-grade
- Good for scale
- Pay-per-use pricing

**Recommendation for P3:** Start with Natural library, add API option as premium feature

---

*[Continued in Part 2...]*

