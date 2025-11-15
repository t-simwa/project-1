# Project 2: TaskFlow Pro - Intermediate MERN Project with TypeScript

## 1. Project Name & Category

**Project Name:** TaskFlow Pro (or "FlowSpace" / "TeamSync")

**Category:** Project Management & Team Collaboration SaaS

**Tagline:** "Streamline Your Team's Workflow - From Planning to Delivery"

---

## 2. Problem Statement & Value Proposition

### The Real-World Problem

Small to medium-sized teams (5-50 members) struggle with project management because:

1. **Existing Solutions Are Overwhelming:** Tools like Jira, Asana, Monday.com are feature-heavy, expensive, and have steep learning curves
2. **Lack of Customization:** Teams need workflows tailored to their specific processes (agile, kanban, custom)
3. **Poor Integration:** Teams use multiple tools (Slack, email, spreadsheets) causing context switching and lost information
4. **Cost Barriers:** Enterprise tools cost $10-20/user/month, making them unaffordable for startups and small teams
5. **No Visual Workflow Builder:** Teams can't easily customize their workflow without technical knowledge

### Why International Employers Will Be Impressed

1. **Enterprise-Grade Thinking:** Shows understanding of B2B SaaS models and team collaboration needs
2. **Technical Sophistication:** Demonstrates complex state management, real-time features, and advanced React patterns
3. **TypeScript Mastery:** Full TypeScript implementation shows commitment to type safety and professional development
4. **DevOps Competence:** Docker containerization and CI/CD pipelines demonstrate production-ready skills
5. **Testing Culture:** ≥60% test coverage shows quality-focused development mindset
6. **Product Vision:** Understanding of workflow customization and user experience in complex applications

### What Makes It Stand Out

- **Niche Focus:** Targets small-medium teams (underserved compared to enterprise tools)
- **Workflow Customization:** Visual workflow builder (unique differentiator)
- **Affordable SaaS Model:** Freemium with clear upgrade path
- **Real-Time Collaboration:** Live updates, notifications, activity feeds
- **Modern Tech Stack:** TypeScript, Docker, comprehensive testing
- **Production-Ready:** Full CI/CD, containerization, monitoring

---

## 3. Core Features (Detailed)

### Authentication & Team Management (Week 1)
1. **Advanced Authentication System**
   - Email/password with email verification
   - OAuth integration (Google, GitHub) - optional but impressive
   - JWT with refresh tokens
   - Role-based access control (Owner, Admin, Member, Viewer)
   - Team invitation system (email invites with tokens)
   - Multi-team support (users can belong to multiple teams)

2. **Team & Workspace Management**
   - Create/manage multiple teams/workspaces
   - Team settings (name, logo, description, timezone)
   - Member management (invite, remove, change roles)
   - Team activity log
   - Team billing/subscription management (for P3 expansion)

### Project & Task Management (Week 2)
3. **Projects & Boards**
   - Create projects with custom workflows
   - Multiple board views: Kanban, List, Calendar, Timeline
   - Custom board columns/stages (drag-and-drop reordering)
   - Project templates (Scrum, Kanban, Custom)
   - Project archiving
   - Project permissions (public/private within team)

4. **Advanced Task Management**
   - Create tasks with rich details:
     - Title, description (rich text editor)
     - Assignees (multiple)
     - Due dates and time
     - Priority levels (Low, Medium, High, Urgent)
     - Labels/tags (customizable colors)
     - Checklists (sub-tasks)
     - Attachments (files, images)
     - Comments/activity log
   - Task dependencies (blocked by, blocks)
   - Task templates
   - Bulk operations (assign, move, delete multiple tasks)
   - Task search and advanced filtering

5. **Custom Workflow Builder (Key Differentiator)**
   - Visual workflow designer
   - Drag-and-drop to create custom stages/columns
   - Define stage rules (who can move tasks, required fields)
   - Automation rules (when task moves to stage X, do Y)
   - Workflow templates library
   - Export/import workflows

### Real-Time Collaboration (Week 3)
6. **Real-Time Updates (Socket.io)**
   - Live task updates (when someone edits, others see changes)
   - Real-time cursor presence (see who's viewing/editing)
   - Live notifications (task assigned, mentioned, due soon)
   - Activity feed (real-time updates of team actions)
   - Online/offline status indicators

7. **Comments & Mentions**
   - Threaded comments on tasks
   - @mention users (sends notification)
   - Rich text formatting in comments
   - Comment reactions (emoji)
   - Edit/delete comments
   - Comment notifications

8. **Notifications System**
   - In-app notification center
   - Email notifications (configurable preferences)
   - Notification types: assignments, mentions, due dates, comments
   - Mark as read/unread
   - Notification preferences per project

### Advanced Features (Week 4)
9. **Search & Filtering**
   - Global search (tasks, projects, comments)
   - Advanced filters:
     - By assignee, label, priority, due date
     - By project, status, created date
     - Custom filter combinations
   - Saved filter views
   - Search history

10. **Analytics & Reporting Dashboard**
    - Project progress charts (completion %, burndown)
    - Team productivity metrics
    - Task distribution by assignee
    - Time tracking (optional: manual time logs)
    - Export reports (PDF, CSV)
    - Custom date range selection

11. **File Management**
    - Upload files to tasks (drag-and-drop)
    - Image preview in tasks
    - File versioning (keep history)
    - File size limits and validation
    - Cloud storage integration (AWS S3/Cloudinary)

12. **Calendar & Timeline Views**
    - Calendar view of tasks (by due date)
    - Timeline/Gantt view (task dependencies visualization)
    - Drag tasks to reschedule
    - Filter by project/assignee in calendar

---

## 4. Technical Architecture

### Frontend Structure (React + TypeScript)

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Toast.tsx
│   │   └── ErrorBoundary.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── Navigation.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── TeamInvite.tsx
│   ├── teams/
│   │   ├── TeamSelector.tsx
│   │   ├── TeamSettings.tsx
│   │   ├── MemberList.tsx
│   │   └── InviteMember.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ProjectSettings.tsx
│   │   └── ProjectTemplates.tsx
│   ├── boards/
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── TaskCard.tsx
│   │   ├── ListView.tsx
│   │   ├── CalendarView.tsx
│   │   └── TimelineView.tsx
│   ├── tasks/
│   │   ├── TaskDetail.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskSearch.tsx
│   │   └── TaskDependencies.tsx
│   ├── workflow/
│   │   ├── WorkflowBuilder.tsx
│   │   ├── WorkflowStage.tsx
│   │   ├── WorkflowRules.tsx
│   │   └── AutomationRules.tsx
│   ├── comments/
│   │   ├── CommentThread.tsx
│   │   ├── CommentForm.tsx
│   │   └── CommentItem.tsx
│   ├── notifications/
│   │   ├── NotificationCenter.tsx
│   │   └── NotificationItem.tsx
│   └── analytics/
│       ├── Dashboard.tsx
│       ├── ProgressChart.tsx
│       ├── ProductivityChart.tsx
│       └── ReportExport.tsx
├── pages/
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── Board.tsx
│   ├── TaskDetail.tsx
│   ├── Analytics.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useSocket.ts
│   ├── useProjects.ts
│   ├── useTasks.ts
│   ├── useNotifications.ts
│   └── useDebounce.ts
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── teamSlice.ts
│   │   ├── projectSlice.ts
│   │   ├── taskSlice.ts
│   │   └── notificationSlice.ts
│   ├── store.ts
│   └── types.ts
├── services/
│   ├── api.ts
│   ├── socket.ts
│   ├── authService.ts
│   ├── projectService.ts
│   └── taskService.ts
├── utils/
│   ├── validation.ts
│   ├── dateUtils.ts
│   ├── formatUtils.ts
│   └── constants.ts
├── types/
│   ├── user.types.ts
│   ├── team.types.ts
│   ├── project.types.ts
│   ├── task.types.ts
│   └── common.types.ts
├── styles/
│   ├── globals.css
│   └── tailwind.config.js
└── App.tsx
```

### Backend API Endpoints (Express + TypeScript)

#### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout (invalidate token)
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/oauth/google` - Google OAuth (optional)

#### Team Routes (`/api/teams`)
- `GET /api/teams` - Get user's teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `GET /api/teams/:id/members` - Get team members
- `POST /api/teams/:id/members/invite` - Invite member
- `PUT /api/teams/:id/members/:userId` - Update member role
- `DELETE /api/teams/:id/members/:userId` - Remove member
- `POST /api/teams/:id/invites/:token/accept` - Accept invitation
- `GET /api/teams/:id/activity` - Get team activity log

#### Project Routes (`/api/projects`)
- `GET /api/projects` - Get projects (filtered by team)
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete/archive project
- `GET /api/projects/:id/boards` - Get project boards
- `POST /api/projects/:id/boards` - Create board
- `PUT /api/projects/:id/boards/:boardId` - Update board
- `GET /api/projects/templates` - Get project templates

#### Task Routes (`/api/tasks`)
- `GET /api/tasks` - Get tasks (with filters, pagination)
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/bulk` - Bulk operations
- `PUT /api/tasks/:id/move` - Move task to different stage
- `POST /api/tasks/:id/assign` - Assign task
- `POST /api/tasks/:id/attachments` - Upload attachment
- `DELETE /api/tasks/:id/attachments/:fileId` - Delete attachment
- `GET /api/tasks/search` - Search tasks

#### Comment Routes (`/api/comments`)
- `GET /api/comments/task/:taskId` - Get task comments
- `POST /api/comments` - Create comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/reactions` - Add reaction

#### Notification Routes (`/api/notifications`)
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `GET /api/notifications/preferences` - Get preferences
- `PUT /api/notifications/preferences` - Update preferences

#### Workflow Routes (`/api/workflows`)
- `GET /api/workflows/project/:projectId` - Get project workflow
- `POST /api/workflows` - Create workflow
- `PUT /api/workflows/:id` - Update workflow
- `POST /api/workflows/:id/stages` - Add workflow stage
- `PUT /api/workflows/:id/stages/:stageId` - Update stage
- `DELETE /api/workflows/:id/stages/:stageId` - Delete stage
- `POST /api/workflows/:id/automations` - Add automation rule

#### Analytics Routes (`/api/analytics`)
- `GET /api/analytics/project/:projectId` - Get project analytics
- `GET /api/analytics/team/:teamId` - Get team analytics
- `GET /api/analytics/reports/:type` - Generate report (PDF/CSV)

### Database Schema (MongoDB with Mongoose + TypeScript)

#### User Model
```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  preferences: {
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      inApp: boolean;
      taskAssigned: boolean;
      mentioned: boolean;
      dueDate: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Team Model
```typescript
interface ITeam {
  _id: ObjectId;
  name: string;
  slug: string; // URL-friendly identifier
  description?: string;
  logo?: string;
  owner: ObjectId; // ref: User
  members: Array<{
    user: ObjectId; // ref: User
    role: 'owner' | 'admin' | 'member' | 'viewer';
    joinedAt: Date;
  }>;
  settings: {
    timezone: string;
    defaultProjectTemplate?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### TeamInvite Model
```typescript
interface ITeamInvite {
  _id: ObjectId;
  team: ObjectId; // ref: Team
  email: string;
  role: 'admin' | 'member' | 'viewer';
  invitedBy: ObjectId; // ref: User
  token: string;
  expiresAt: Date;
  accepted: boolean;
  createdAt: Date;
}
```

#### Project Model
```typescript
interface IProject {
  _id: ObjectId;
  name: string;
  description?: string;
  team: ObjectId; // ref: Team
  owner: ObjectId; // ref: User
  workflow: ObjectId; // ref: Workflow
  template?: string;
  settings: {
    visibility: 'team' | 'private';
    defaultView: 'kanban' | 'list' | 'calendar' | 'timeline';
  };
  archived: boolean;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Workflow Model
```typescript
interface IWorkflow {
  _id: ObjectId;
  name: string;
  project: ObjectId; // ref: Project
  stages: Array<{
    _id: ObjectId;
    name: string;
    order: number;
    color: string;
    rules?: {
      requiredFields?: string[];
      allowedRoles?: string[];
    };
  }>;
  automations: Array<{
    trigger: string; // e.g., 'stage_change'
    condition: object;
    action: string; // e.g., 'assign_user', 'send_notification'
  }>;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Task Model
```typescript
interface ITask {
  _id: ObjectId;
  title: string;
  description?: string;
  project: ObjectId; // ref: Project
  board: ObjectId; // ref: Board (if using boards)
  stage: ObjectId; // ref: Workflow.stages
  assignees: ObjectId[]; // ref: User[]
  createdBy: ObjectId; // ref: User
  priority: 'low' | 'medium' | 'high' | 'urgent';
  labels: Array<{
    name: string;
    color: string;
  }>;
  dueDate?: Date;
  startDate?: Date;
  checklists: Array<{
    _id: ObjectId;
    title: string;
    items: Array<{
      _id: ObjectId;
      text: string;
      completed: boolean;
    }>;
  }>;
  attachments: Array<{
    _id: ObjectId;
    filename: string;
    url: string;
    size: number;
    uploadedBy: ObjectId; // ref: User
    uploadedAt: Date;
  }>;
  dependencies: {
    blocks: ObjectId[]; // ref: Task[]
    blockedBy: ObjectId[]; // ref: Task[]
  };
  timeTracking?: {
    estimated: number; // minutes
    logged: number; // minutes
    entries: Array<{
      user: ObjectId;
      duration: number;
      date: Date;
    }>;
  };
  position: number; // for ordering within stage
  createdAt: Date;
  updatedAt: Date;
}
```

#### Comment Model
```typescript
interface IComment {
  _id: ObjectId;
  task: ObjectId; // ref: Task
  author: ObjectId; // ref: User
  content: string; // rich text
  parent?: ObjectId; // ref: Comment (for threading)
  reactions: Array<{
    user: ObjectId;
    emoji: string;
  }>;
  mentions: ObjectId[]; // ref: User[]
  edited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Notification Model
```typescript
interface INotification {
  _id: ObjectId;
  user: ObjectId; // ref: User (recipient)
  type: 'task_assigned' | 'mentioned' | 'comment' | 'due_date' | 'stage_change';
  title: string;
  message: string;
  link?: string; // URL to related resource
  relatedUser?: ObjectId; // ref: User (who triggered)
  relatedTask?: ObjectId; // ref: Task
  relatedProject?: ObjectId; // ref: Project
  read: boolean;
  readAt?: Date;
  createdAt: Date;
}
```

#### ActivityLog Model
```typescript
interface IActivityLog {
  _id: ObjectId;
  team?: ObjectId; // ref: Team
  project?: ObjectId; // ref: Project
  user: ObjectId; // ref: User
  action: string; // e.g., 'task_created', 'task_moved', 'comment_added'
  entityType: 'task' | 'project' | 'team' | 'comment';
  entityId: ObjectId;
  metadata: object; // flexible data
  createdAt: Date;
}
```

### Authentication Flow

1. **Registration:**
   - User submits registration form (TypeScript validated)
   - Backend validates with Zod/Yup schema
   - Password hashed with bcrypt
   - User created with `emailVerified: false`
   - Email verification token generated
   - Verification email sent (Nodemailer/SendGrid)
   - Returns user data (no password)

2. **Team Invitation:**
   - Admin invites user by email
   - Invitation token generated (expires in 7 days)
   - Email sent with invitation link
   - User clicks link, creates account (if new) or accepts (if existing)
   - User added to team with specified role

3. **JWT Authentication:**
   - Access token: 15 minutes (short-lived for security)
   - Refresh token: 7 days (stored in httpOnly cookie)
   - Token includes: userId, email, teamIds, role
   - Refresh endpoint validates refresh token and issues new access token

4. **Role-Based Access Control:**
   - Middleware checks user role for protected routes
   - Owner: Full access
   - Admin: Manage members, projects, settings
   - Member: Create/edit tasks, comment
   - Viewer: Read-only access

### State Management Approach

**Redux Toolkit (RTK) with TypeScript**

**Why Redux Toolkit:**
- More complex state than P1 (multiple teams, projects, real-time updates)
- Better for managing server state and caching
- Excellent TypeScript support
- DevTools for debugging
- Industry standard for complex React apps

**Store Structure:**
```typescript
{
  auth: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  teams: {
    currentTeam: Team | null;
    teams: Team[];
    members: User[];
  };
  projects: {
    projects: Project[];
    currentProject: Project | null;
    filters: FilterState;
  };
  tasks: {
    tasks: Task[];
    currentTask: Task | null;
    filters: TaskFilterState;
  };
  notifications: {
    notifications: Notification[];
    unreadCount: number;
  };
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    modals: ModalState;
  };
}
```

### Real-Time Implementation (Socket.io)

**Socket Events:**

**Client → Server:**
- `join:team` - Join team room
- `join:project` - Join project room
- `join:task` - Join task room (for live editing)
- `task:update` - Task being edited
- `task:cursor` - Cursor position (for collaborative editing)
- `typing:comment` - User typing comment

**Server → Client:**
- `task:updated` - Task was updated by someone
- `task:created` - New task created
- `task:moved` - Task moved to different stage
- `comment:added` - New comment added
- `notification:new` - New notification
- `user:online` - User came online
- `user:offline` - User went offline

**Implementation:**
- Socket.io server integrated with Express
- Room-based messaging (team, project, task rooms)
- Presence tracking (who's online, viewing what)
- Rate limiting on socket events
- Reconnection handling on client

### File Storage Strategy

**AWS S3 + CloudFront (Recommended for P2)**

**Why AWS S3:**
- More professional/enterprise-grade than Cloudinary
- Better for resume (shows AWS experience)
- Cost-effective (pay for what you use)
- Scalable and reliable
- Can add CloudFront CDN for performance

**Implementation:**
- Multer for file upload handling
- AWS SDK for S3 operations
- File validation (type, size)
- Generate unique filenames (UUID)
- Store file metadata in MongoDB
- Presigned URLs for secure file access
- Image optimization (sharp library) before upload

**File Structure:**
```
s3-bucket/
  teams/
    {teamId}/
      projects/
        {projectId}/
          tasks/
            {taskId}/
              {filename}
```

---

## 5. UI/UX Design Specifications

### Design System: Chakra UI + Tailwind CSS

**Why Chakra UI:**
- Excellent TypeScript support
- Accessible components out of the box (WCAG compliant)
- Modern, professional design
- Highly customizable
- Great developer experience
- Used by companies like Vercel, GitHub

**Why Combine with Tailwind:**
- Chakra for components, Tailwind for custom styling
- Best of both worlds
- Flexibility for unique designs

### Color Palette

**Primary Colors:**
- Primary: `#6366F1` (Indigo-500) - Trust, productivity
- Primary Dark: `#4F46E5` (Indigo-600)
- Primary Light: `#818CF8` (Indigo-400)

**Secondary Colors:**
- Secondary: `#10B981` (Emerald-500) - Success, completion
- Secondary Dark: `#059669` (Emerald-600)

**Status Colors:**
- Success: `#10B981` (Emerald-500)
- Warning: `#F59E0B` (Amber-500)
- Error: `#EF4444` (Red-500)
- Info: `#3B82F6` (Blue-500)

**Priority Colors:**
- Low: `#94A3B8` (Slate-400)
- Medium: `#3B82F6` (Blue-500)
- High: `#F59E0B` (Amber-500)
- Urgent: `#EF4444` (Red-500)

**Neutral Colors:**
- Background: `#FFFFFF` (White)
- Surface: `#F8FAFC` (Slate-50)
- Border: `#E2E8F0` (Slate-200)
- Text Primary: `#0F172A` (Slate-900)
- Text Secondary: `#64748B` (Slate-500)
- Text Muted: `#94A3B8` (Slate-400)

**Dark Mode Support:**
- Background: `#0F172A` (Slate-900)
- Surface: `#1E293B` (Slate-800)
- Border: `#334155` (Slate-700)
- Text Primary: `#F1F5F9` (Slate-100)

### Typography

**Font Family:**
- Primary: `Inter` (Google Fonts)
- Monospace: `JetBrains Mono` (for code, IDs)

**Font Sizes:**
- Display: `text-5xl` (48px) - Hero
- H1: `text-4xl` (36px) - Page titles
- H2: `text-3xl` (30px) - Section headings
- H3: `text-2xl` (24px) - Subsection
- H4: `text-xl` (20px)
- Body Large: `text-lg` (18px)
- Body: `text-base` (16px)
- Body Small: `text-sm` (14px)
- Caption: `text-xs` (12px)

### Layout Structure

**Main Application Layout:**
```
┌─────────────────────────────────────────┐
│              Header                     │
│  (Logo | Search | Notifications | User) │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │      Main Content            │
│          │      (Dynamic per route)     │
│ - Teams  │                              │
│ - Projects│                             │
│ - Dashboard│                            │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

**Kanban Board Layout:**
```
┌─────────────────────────────────────────┐
│  Project Header (Breadcrumb, Actions)   │
├─────────────────────────────────────────┤
│  [Filter Bar] [View Toggle] [Settings]  │
├──────┬──────┬──────┬──────┬─────────────┤
│      │      │      │      │             │
│ To Do│ In   │Review│ Done │  + Add      │
│      │Progress│    │      │  Column     │
│      │      │      │      │             │
│ [Task]│[Task]│[Task]│[Task]│             │
│ [Task]│[Task]│      │[Task]│             │
│      │      │      │      │             │
└──────┴──────┴──────┴──────┴─────────────┘
```

### Key UI Components

1. **KanbanBoard Component**
   - Drag-and-drop columns (react-beautiful-dnd or @dnd-kit)
   - Drag-and-drop tasks between columns
   - Column header with task count
   - Add task button in column
   - Column settings (rename, delete, color)

2. **TaskCard Component**
   - Compact card view
   - Priority indicator (colored dot/bar)
   - Assignee avatars (multiple)
   - Labels/tags
   - Due date badge
   - Checklist progress
   - Attachment count
   - Comment count
   - Hover: Quick actions (edit, delete)

3. **TaskDetail Modal/Drawer**
   - Full task information
   - Rich text description editor
   - Assignee selector (multi-select)
   - Due date picker
   - Priority selector
   - Label manager
   - Checklist manager
   - File attachments
   - Comments thread
   - Activity log
   - Dependencies visualization

4. **WorkflowBuilder Component**
   - Visual canvas
   - Drag-and-drop stage creation
   - Stage configuration panel
   - Automation rule builder
   - Preview mode
   - Save/export workflow

5. **NotificationCenter**
   - Slide-out panel
   - Grouped by type/date
   - Mark as read/unread
   - Click to navigate
   - Clear all button

6. **SearchBar (Global)**
   - Command palette style (Cmd+K)
   - Search projects, tasks, users
   - Keyboard shortcuts
   - Recent searches
   - Quick actions

7. **Analytics Dashboard**
   - Chart components (recharts)
   - Progress indicators
   - Metric cards
   - Date range picker
   - Export buttons

### User Flows

#### Flow 1: Creating a Project with Custom Workflow

1. **Navigate to Projects**
   - Clicks "Projects" in sidebar
   - Sees list of existing projects
   - Clicks "New Project" button

2. **Project Creation Form**
   - Modal opens
   - Enters project name: "Website Redesign"
   - Selects team from dropdown
   - Chooses template: "Custom" (or selects existing)
   - Clicks "Create Project"

3. **Workflow Builder**
   - Redirected to workflow builder page
   - Sees default stages: "To Do", "In Progress", "Done"
   - Clicks "Add Stage" button
   - Adds "Design Review" stage
   - Drags to reorder: To Do → Design Review → In Progress → Done
   - Clicks on "Design Review" stage
   - Configures rules:
     - Required field: "Designer Approval"
     - Only "Admin" role can move tasks here
   - Adds automation: "When task moves to Design Review, notify @design-team"
   - Clicks "Save Workflow"

4. **Project Created**
   - Redirected to project Kanban board
   - Sees custom columns with new workflow
   - Can start creating tasks

**Wireframe:**
- Workflow Builder: Canvas area (70% width), configuration panel (30% width, right side)
- Drag-and-drop stages as cards
- Connection lines between stages (optional, for visual flow)

#### Flow 2: Real-Time Task Collaboration

1. **Viewing Task**
   - User A opens task "Design Homepage"
   - Task detail modal opens
   - Sees task information

2. **Another User Joins**
   - User B opens same task
   - User A sees "User B is viewing" indicator
   - User B sees "User A is viewing" indicator

3. **Live Editing**
   - User A starts editing description
   - User B sees "User A is editing..." indicator
   - User A saves changes
   - User B's view automatically updates (no refresh needed)
   - Toast notification: "User A updated this task"

4. **Adding Comment**
   - User B types comment: "@UserA Can you add more details?"
   - User A receives real-time notification
   - Comment appears in User A's view immediately
   - User A gets in-app notification badge

**Wireframe:**
- Task modal: Header shows "2 people viewing" with avatars
- Description editor shows "User A is editing..." when active
- Comments section updates in real-time
- Notification badge animates when new notification arrives

#### Flow 3: Analytics & Reporting

1. **Navigate to Analytics**
   - Clicks "Analytics" in sidebar
   - Sees dashboard with project selector

2. **Select Project & Date Range**
   - Selects "Website Redesign" project
   - Chooses date range: "Last 30 days"
   - Dashboard loads with data

3. **View Metrics**
   - Sees completion percentage: 65%
   - Burndown chart showing progress over time
   - Task distribution pie chart (by assignee)
   - Productivity metrics:
     - Tasks completed: 45
     - Average completion time: 2.3 days
     - Most productive day: Tuesday

4. **Export Report**
   - Clicks "Export Report" button
   - Selects format: PDF
   - Report generates and downloads
   - Opens PDF with charts and metrics

**Wireframe:**
- Dashboard: Grid layout (2 columns on desktop)
- Top row: Metric cards (4 cards: Completion %, Tasks Done, Avg Time, Productivity)
- Middle: Large chart area (burndown chart)
- Bottom: Two smaller charts side-by-side (distribution, timeline)

### Responsive Breakpoints

**Mobile:** `< 768px`
- Hamburger menu for sidebar
- Single column Kanban (swipe between columns)
- Bottom navigation bar
- Full-screen modals
- Stacked layouts

**Tablet:** `768px - 1024px`
- Collapsible sidebar
- 2-column Kanban
- Side panel modals
- Adaptive grid layouts

**Desktop:** `> 1024px`
- Persistent sidebar
- Full Kanban board (multiple columns)
- Centered modals
- Multi-column layouts
- Hover states active

### Accessibility Features

1. **Keyboard Navigation**
   - Full keyboard support (Tab, Enter, Escape, Arrow keys)
   - Keyboard shortcuts (Cmd+K for search, etc.)
   - Focus management in modals
   - Skip links

2. **Screen Reader Support**
   - ARIA labels on all interactive elements
   - ARIA live regions for dynamic updates
   - Semantic HTML structure
   - Alt text for images
   - Descriptive link text

3. **Color & Contrast**
   - WCAG AA compliance (4.5:1 contrast)
   - Don't rely solely on color (use icons + color)
   - Dark mode support

4. **Focus Indicators**
   - Visible focus rings
   - High contrast focus styles
   - Logical tab order

5. **Drag-and-Drop Accessibility**
   - Keyboard alternatives for drag-and-drop
   - Screen reader announcements
   - ARIA drag-and-drop attributes

---

*[Continued in Part 2...]*

