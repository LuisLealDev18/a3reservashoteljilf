/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `school_grades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "school_grades";

-- CreateTable
CREATE TABLE "student_school_subject" (
    "id" TEXT NOT NULL,
    "school_grade" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "school_subject_id" TEXT NOT NULL,

    CONSTRAINT "student_school_subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "school_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_key" ON "employees"("user");

-- AddForeignKey
ALTER TABLE "student_school_subject" ADD CONSTRAINT "student_school_subject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_school_subject" ADD CONSTRAINT "student_school_subject_school_subject_id_fkey" FOREIGN KEY ("school_subject_id") REFERENCES "school_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
