ALTER TABLE "user" ALTER COLUMN "group" SET DEFAULT '{"default"}';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" text[] DEFAULT '{"user"}' NOT NULL;