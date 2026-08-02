-- Create Admin Audit Logs Table
CREATE TABLE public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES auth.users(id) NOT NULL,
    target_user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    result TEXT DEFAULT 'success',
    error_message TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create User Activity Logs Table
CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    action TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    device TEXT,
    browser TEXT,
    operating_system TEXT,
    ip_address TEXT,
    login_method TEXT,
    session_id TEXT,
    user_agent TEXT,
    timezone TEXT,
    language TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_audit_logs
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Admins can insert audit logs" ON public.admin_audit_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
        )
    );

-- RLS Policies for user_activity_logs
CREATE POLICY "Admins can view all activity logs" ON public.user_activity_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Users can view their own activity logs" ON public.user_activity_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity logs" ON public.user_activity_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Indexes for performance
CREATE INDEX idx_admin_audit_logs_created_at ON public.admin_audit_logs (created_at DESC);
CREATE INDEX idx_admin_audit_logs_admin_user_id ON public.admin_audit_logs (admin_user_id);
CREATE INDEX idx_admin_audit_logs_action ON public.admin_audit_logs (action);
CREATE INDEX idx_admin_audit_logs_target_user_id ON public.admin_audit_logs (target_user_id);

CREATE INDEX idx_user_activity_logs_created_at ON public.user_activity_logs (created_at DESC);
CREATE INDEX idx_user_activity_logs_user_id ON public.user_activity_logs (user_id);
CREATE INDEX idx_user_activity_logs_action ON public.user_activity_logs (action);
