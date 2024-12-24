export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      carol_suggestions: {
        Row: {
          created_at: string
          desired_style: string
          id: string
          notes: string | null
          original_carol: string
          session_id: string
          status: string
        }
        Insert: {
          created_at?: string
          desired_style: string
          id?: string
          notes?: string | null
          original_carol: string
          session_id: string
          status?: string
        }
        Update: {
          created_at?: string
          desired_style?: string
          id?: string
          notes?: string | null
          original_carol?: string
          session_id?: string
          status?: string
        }
        Relationships: []
      }
      carol_tags: {
        Row: {
          carol_id: string
          created_at: string
          tag_id: string
        }
        Insert: {
          carol_id: string
          created_at?: string
          tag_id: string
        }
        Update: {
          carol_id?: string
          created_at?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carol_tags_carol_id_fkey"
            columns: ["carol_id"]
            isOneToOne: false
            referencedRelation: "christmas_carols"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carol_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      christmas_carols: {
        Row: {
          audio_path: string
          created_at: string
          genre: string
          id: string
          original_carol: string
          plays: number
          title: string
        }
        Insert: {
          audio_path: string
          created_at?: string
          genre: string
          id?: string
          original_carol: string
          plays?: number
          title: string
        }
        Update: {
          audio_path?: string
          created_at?: string
          genre?: string
          id?: string
          original_carol?: string
          plays?: number
          title?: string
        }
        Relationships: []
      }
      christmas_jokes: {
        Row: {
          created_at: string
          id: string
          joke_text: string
          likes: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          joke_text: string
          likes?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          joke_text?: string
          likes?: number | null
        }
        Relationships: []
      }
      elf_presence: {
        Row: {
          client_id: string
          elf_image: string
          elf_name: string
          id: string
          last_seen: string | null
          x: number
          y: number
        }
        Insert: {
          client_id: string
          elf_image: string
          elf_name: string
          id?: string
          last_seen?: string | null
          x: number
          y: number
        }
        Update: {
          client_id?: string
          elf_image?: string
          elf_name?: string
          id?: string
          last_seen?: string | null
          x?: number
          y?: number
        }
        Relationships: []
      }
      elf_voice_snippets: {
        Row: {
          audio_url: string
          created_at: string
          id: string
          key_name: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          id?: string
          key_name: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          id?: string
          key_name?: string
        }
        Relationships: []
      }
      generated_sprites: {
        Row: {
          color_palette: string
          created_at: string
          id: string
          image_path: string
          is_magical: boolean
          theme: string
        }
        Insert: {
          color_palette: string
          created_at?: string
          id?: string
          image_path: string
          is_magical?: boolean
          theme: string
        }
        Update: {
          color_palette?: string
          created_at?: string
          id?: string
          image_path?: string
          is_magical?: boolean
          theme?: string
        }
        Relationships: []
      }
      generated_sweaters: {
        Row: {
          color_palette: string
          created_at: string
          id: string
          image_path: string
          is_quirky: boolean | null
          theme: string
        }
        Insert: {
          color_palette: string
          created_at?: string
          id?: string
          image_path: string
          is_quirky?: boolean | null
          theme: string
        }
        Update: {
          color_palette?: string
          created_at?: string
          id?: string
          image_path?: string
          is_quirky?: boolean | null
          theme?: string
        }
        Relationships: []
      }
      generated_wallpapers: {
        Row: {
          color_palette: string
          created_at: string
          id: string
          image_path: string
          is_repeatable: boolean
          theme: string
        }
        Insert: {
          color_palette: string
          created_at?: string
          id?: string
          image_path: string
          is_repeatable?: boolean
          theme: string
        }
        Update: {
          color_palette?: string
          created_at?: string
          id?: string
          image_path?: string
          is_repeatable?: boolean
          theme?: string
        }
        Relationships: []
      }
      grinch_roasts: {
        Row: {
          carol_id: string
          carol_title: string
          created_at: string
          id: string
          roast_text: string
        }
        Insert: {
          carol_id: string
          carol_title: string
          created_at?: string
          id?: string
          roast_text: string
        }
        Update: {
          carol_id?: string
          carol_title?: string
          created_at?: string
          id?: string
          roast_text?: string
        }
        Relationships: []
      }
      letters: {
        Row: {
          age: number
          created_at: string
          id: string
          letter: string
          name: string
          response: string | null
          user_id: string | null
        }
        Insert: {
          age: number
          created_at?: string
          id?: string
          letter: string
          name: string
          response?: string | null
          user_id?: string | null
        }
        Update: {
          age?: number
          created_at?: string
          id?: string
          letter?: string
          name?: string
          response?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: number
          project_name: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          project_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          project_name?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_likes: {
        Args: {
          joke_id: string
        }
        Returns: undefined
      }
      read_secret: {
        Args: {
          secret_name: string
        }
        Returns: {
          secret: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never