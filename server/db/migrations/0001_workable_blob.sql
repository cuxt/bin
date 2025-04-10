CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text,
	"value" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
