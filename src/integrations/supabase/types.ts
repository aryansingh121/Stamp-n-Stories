export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          age: number | null;
          cant_stop_doing: string | null;
          city: string | null;
          created_at: string;
          full_name: string | null;
          icebreaker: string | null;
          id: string;
          id_proof_url: string | null;
          instagram: string | null;
          interests: string[];
          issued_at: string;
          level: string;
          personality: string | null;
          photo_gallery: string[];
          photo_url: string | null;
          points: number;
          stamps: Json;
          status: Database["public"]["Enums"]["profile_status"];
          submitted: boolean;
          travel_vibe: string | null;
          traveller_code: string;
          updated_at: string;
        };
        Insert: {
          age?: number | null;
          cant_stop_doing?: string | null;
          city?: string | null;
          created_at?: string;
          full_name?: string | null;
          icebreaker?: string | null;
          id: string;
          id_proof_url?: string | null;
          instagram?: string | null;
          interests?: string[];
          issued_at?: string;
          level?: string;
          personality?: string | null;
          photo_gallery?: string[];
          photo_url?: string | null;
          points?: number;
          stamps?: Json;
          status?: Database["public"]["Enums"]["profile_status"];
          submitted?: boolean;
          travel_vibe?: string | null;
          traveller_code: string;
          updated_at?: string;
        };
        Update: {
          age?: number | null;
          cant_stop_doing?: string | null;
          city?: string | null;
          created_at?: string;
          full_name?: string | null;
          icebreaker?: string | null;
          id?: string;
          id_proof_url?: string | null;
          instagram?: string | null;
          interests?: string[];
          issued_at?: string;
          level?: string;
          personality?: string | null;
          photo_gallery?: string[];
          photo_url?: string | null;
          points?: number;
          stamps?: Json;
          status?: Database["public"]["Enums"]["profile_status"];
          submitted?: boolean;
          travel_vibe?: string | null;
          traveller_code?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      admin_audit_logs: {
        Row: {
          id: string;
          admin_user_id: string;
          target_user_id: string | null;
          action: string;
          description: string | null;
          metadata: Json | null;
          result: string | null;
          error_message: string | null;
          session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_user_id: string;
          target_user_id?: string | null;
          action: string;
          description?: string | null;
          metadata?: Json | null;
          result?: string | null;
          error_message?: string | null;
          session_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_user_id?: string;
          target_user_id?: string | null;
          action?: string;
          description?: string | null;
          metadata?: Json | null;
          result?: string | null;
          error_message?: string | null;
          session_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_admin_user_id_fkey";
            columns: ["admin_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admin_audit_logs_target_user_id_fkey";
            columns: ["target_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_activity_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          description: string | null;
          metadata: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          os: string | null;
          browser: string | null;
          device_type: string | null;
          login_method: string | null;
          session_id: string | null;
          timezone: string | null;
          language: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          description?: string | null;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          os?: string | null;
          browser?: string | null;
          device_type?: string | null;
          login_method?: string | null;
          session_id?: string | null;
          timezone?: string | null;
          language?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          description?: string | null;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          os?: string | null;
          browser?: string | null;
          device_type?: string | null;
          login_method?: string | null;
          session_id?: string | null;
          timezone?: string | null;
          language?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "member";
      profile_status: "pending" | "approved" | "rejected";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member"],
      profile_status: ["pending", "approved", "rejected"],
    },
  },
} as const;
