export interface User {
  user_id: string
  username: string
  email: string
  firstname: string
  lastname: string
  nickname?: string
  dob?: string
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  student_status?: 'current_student' | 'alumni' | 'not_student'
  home_country?: string
  university?: string
  study_year?: number
  degree?: string
  interest?: string
  current_score: number
  created_at: string
  role: 'member' | 'admin'
  telephone?: string
  igen_club?: string
  faculty?: string
  major?: string
  nationality?: string
  religious?: string
  current_country?: string
  current_city?: string
  occupation?: string
  profile_image_url?: string
  bio?: string
  is_active: boolean
  last_login?: string
}

export interface Activity {
  activity_id: string
  title: string
  description?: string
  event_type: 'camp' | 'online' | 'one_day' | 'workshop' | 'seminar' | 'conference' | 'volunteer' | 'other'
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  duration_hours?: number
  location?: string
  max_participants?: number
  current_participants: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  created_by: string
  created_at: string
  updated_at: string
  image_url?: string
  registration_deadline?: string
  cost: number
  requirements?: string
  is_featured: boolean
  category_id?: string
}

export interface ActivityParticipant {
  participant_id: string
  activity_id: string
  user_id: string
  role: 'participant' | 'organizer' | 'volunteer' | 'speaker' | 'mentor' | 'helper'
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled' | 'no_show'
  registered_at: string
  confirmed_at?: string
  attended_at?: string
  score_earned: number
  feedback?: string
  notes?: string
  user?: User
  activity?: Activity
}

export interface UserLog {
  log_id: string
  user_id: string
  action_type: string
  action_description?: string
  ip_address?: string
  user_agent?: string
  session_id?: string
  created_at: string
  additional_data?: Record<string, unknown>
  user?: User
}

export interface News {
  news_id: string
  title: string
  content: string
  summary?: string
  author_id: string
  published_at: string
  updated_at: string
  image_url?: string
  is_published: boolean
  tags?: string[]
  view_count: number
  author?: User
}

export interface ContactMessage {
  message_id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: 'unread' | 'read' | 'replied' | 'archived'
  replied_at?: string
  replied_by?: string
  reply_message?: string
  ip_address?: string
  replier?: User
}

export interface UserScore {
  score_id: string
  user_id: string
  activity_id?: string
  score_type: 'participation' | 'leadership' | 'volunteer' | 'achievement' | 'bonus'
  points: number
  description?: string
  awarded_by: string
  awarded_at: string
  user?: User
  activity?: Activity
  awarded_by_user?: User
}

export interface UserSkill {
  skill_id: string
  user_id: string
  skill_name: string
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  verified: boolean
  verified_by?: string
  verified_at?: string
  created_at: string
  user?: User
  verifier?: User
}

export interface ActivityCategory {
  category_id: string
  name: string
  description?: string
  color?: string
  icon?: string
  created_at: string
}

// Certificate System Types
export interface CertificateTemplate {
  template_id: string
  name: string
  description?: string
  template_html: string
  background_image_url?: string
  signature_image_url?: string
  created_by: string
  created_at: string
  updated_at: string
  is_active: boolean
  creator?: User
}

export interface CertificateRequest {
  request_id: string
  user_id: string
  activity_id: string
  template_id?: string
  request_type: 'participation' | 'leadership' | 'volunteer' | 'achievement' | 'custom'
  custom_title?: string
  custom_description?: string
  status: 'pending' | 'approved' | 'rejected' | 'generated'
  requested_at: string
  approved_at?: string
  approved_by?: string
  rejected_at?: string
  rejected_by?: string
  rejection_reason?: string
  generated_at?: string
  certificate_url?: string
  certificate_id?: string
  notes?: string
  user?: User
  activity?: Activity
  template?: CertificateTemplate
  approver?: User
  rejector?: User
}

export interface CertificateVerification {
  verification_id: string
  certificate_id: string
  request_id: string
  verification_code: string
  is_valid: boolean
  verified_at?: string
  verified_by_ip?: string
  created_at: string
  request?: CertificateRequest
}

export interface CertificateRequirement {
  requirement_id: string
  activity_id: string
  request_type: 'participation' | 'leadership' | 'volunteer' | 'achievement' | 'custom'
  minimum_attendance_hours: number
  minimum_score: number
  required_role?: 'participant' | 'organizer' | 'volunteer' | 'speaker' | 'mentor' | 'helper'
  auto_approve: boolean
  created_at: string
  updated_at: string
  activity?: Activity
} 