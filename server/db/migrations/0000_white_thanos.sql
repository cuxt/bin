CREATE TYPE "public"."group" AS ENUM('default', 'vip', 'svip');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('super_admin', 'admin', 'user');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"nick_name" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"user_status" boolean DEFAULT true NOT NULL,
	"email" text NOT NULL,
	"github_id" text,
	"wechat_id" text,
	"lark_id" text,
	"accessToken" uuid DEFAULT gen_random_uuid(),
	"group" text[] DEFAULT ARRAY['default'] NOT NULL,
	"aff_code" text NOT NULL,
	"inviter_id" uuid,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "user_wechat_id_unique" UNIQUE("wechat_id"),
	CONSTRAINT "user_lark_id_unique" UNIQUE("lark_id")
);
