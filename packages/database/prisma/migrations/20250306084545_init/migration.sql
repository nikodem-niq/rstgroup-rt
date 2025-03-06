-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'INVOICE', 'POST', 'WORK');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(60),
    "last_name" VARCHAR(100) NOT NULL,
    "initials" VARCHAR(30),
    "email" VARCHAR(100) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_addresses" (
    "user_id" INTEGER NOT NULL,
    "addressType" "AddressType" NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "post_code" VARCHAR(6) NOT NULL,
    "city" VARCHAR(60) NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "building_number" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_addresses_pkey" PRIMARY KEY ("user_id","addressType","valid_from")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
