# comands to create base code

nest g module < ModuleName >s && nest g controller < ModuleName >s && nest g service < ModuleName >s && nest g class < ModuleName >s/models/< ModuleName >.entity && nest g class < ModuleName >s/dto/< ModuleName >.dto && nest g class < ModuleName >s/< ModuleName >.repository && nest g class < ModuleName >s/enums/< ModuleName >.enum

# Todo List

# Define all actions

# Owners

- Incluir

[X] Médico
[X] Owner
[X] Adm

- Excluir

[X] Soft Delete Usuário

- List Users

[X] By Page
[X] By Name
[X] By Filters

- Owners dashboard

[X] List
[X] Search By Name
[X] Change Salary  
[X] Dismiss

- Adm Dashboard

[X] List
[X] Search By Name
[X] Change Salary  
[X] Dismiss

- Doctors Dashboard

[X] List
[X] Search by name
[X] Change Salary
[X] Dismiss
[X] Change Specialty

- Dashboard info

  [ ] General Info graph

# ADMINS

- Search

[X] Search Users

[X] Search by name

[X] Search by filters

[X] Search Lab User

- Incluir

[X] Recept

- Excluir

[X] Recept

- Recept

[X] List Recept
[X] Search by name
[X] View Profile
[X] Change Salary
[X] Dismis

- Lab

[X] List
[X] Search by Name
[X] Add User
[X] Remove User
[X] List Users
[X] Remove Lab
[X] Add Lab

# LAB

[X] Add Exam
[X] Add Result
[X] Remove Result
[X] Cancel Exam
[X] Release Exam

[X] List Exams
[X] Search Exams by UserName

# Doctor

## New Prescriptions

[X] Search Medicine
[X] Create Prescription
[X] Add Exam
[X] Remove Exam
[X] Add Medicine
[X] Remove Medicine

## Exams

[X] Download results
[X] Release Exams
[X] Cancel Exams

## Prescriptions

[x] List
[X] Search by Name

## Appointments

[x] List by Date
[x] Add new Prescription

## Schedule

[X] Create Schedule
[X] List Schedule by Week
[X] List Schedule by Date
[X] Remove Schedule

# Recept

## Clients

[X] Add Client

## Verify

[X] List Clients
[X] Add ID document
[X] Confirm Client

## Appointments

[X] List by Week
[X] List by Date
[X] Search by Doctor Name
[X] Confirm Appointment
[X] Reeschedule
[X] Cancel
[X] Delete

## Eschedules

[X] List Schedules by Week
[X] List Schedules by Date
[X] Search Schedules by Name
[X] Create Appoinment

# Client

## Dashboard

[X] Data graph
[X] List appoinments
[X] List Notifications
[X] List Doctors
[X] Search Doctor by Name
[X] Create Appointment

## Exams

[X] List Exams
[X] Search Exam by doctor name
[X] Download Exame Result

## History

[X] List Prescriptions
[ ] Donwload Prescriptions
[X] Search prescription by doctor name

{/users, GET} route +4ms
{/users/search, GET} route +1ms
{/users/:id, GET} route +1ms
{/users/:id, PUT} route +0ms
{/users/:id, DELETE} route +0ms
{/emails, POST} route +0ms
{/auth/signup, POST} route +7ms
{/auth/signup, PATCH} route +2ms
{/auth/signin, POST} route +1ms
{/auth/confirmation/:token, GET} route +1ms
{/avatars, POST} route +0ms
{/avatars/:avatarpath, GET} route +1ms
{/avatars/:id, DELETE} route +0ms
{/clients, POST} route +0ms
{/clients, GET} route +1ms
{/clients/:id, GET} route +9ms
{/clients/:id/reports, GET} route +0ms
{/clients/:id/appointments, GET} route +0ms
{/clients/:id/exams, GET} route +1ms
{/clients/:id/prescriptions, GET} route +0ms
{/clients/:id/appointments/:appId, DELETE} route +1ms
{/clients/:id, PATCH} route +1ms
{/clients/:id/status, PATCH} route +0ms
{/photos, POST} route +1ms
{/photos/:photoPath, GET} route +0ms
{/photos/:id, DELETE} route +0ms
{/notifications, POST} route +0ms
{/appointments, POST} route +9ms
{/appointments, GET} route +1ms
{/appointments/:id, GET} route +0ms
{/appointments/:id, DELETE} route +1ms
{/appointments/:id/status, PATCH} route +1ms
{/doctors, POST} route +0ms
{/doctors, GET} route +1ms
{/doctors/:id, GET} route +0ms
{/doctors/:id, PUT} route +0ms
{/doctors/:id/status, PATCH} route +1ms
{/doctors/:id/diff, PATCH} route +0ms
{/doctors/:id, DELETE} route +0ms
{/doctors/:id/schedules, GET} route +1ms
{/doctors/:id/free-schedules, GET} route +0ms
{/doctors/:id/appointments, GET} route +0ms
{/doctors/:id/clients, GET} route +1ms
{/doctors/:id/appointments/:appointmentId, GET} route +0ms
{/doctors/:id/schedules, POST} route +0ms
{/doctors/:id/schedules, PATCH} route +1ms
{/doctors/:id/prescriptions, POST} route +0ms
{/doctors/:id/prescriptions/:prescriptionId, GET} route +0ms
{/doctors/:id/prescriptions/:prescriptionId, PUT} route +1ms
{/doctors/:id/prescriptions/:prescriptionId, DELETE} route +9ms
{/doctors/:id/prescriptions, GET} route +0ms
{/doctors/:id/exams, GET} route +1ms
{/doctors/:id/exams/
{/exams, POST} route +0ms
{/exams, GET} route +1ms
{/exams/:code, GET} route +0ms
{/exams/:id, DELETE} route +0ms
{/exams/:id, PATCH} route +1ms
{/exams/:id, PUT} route +0ms
{/labs, POST} route +1ms
{/labs, GET} route +0ms
{/labs/:id, GET} route +0ms
{/labs/:id/exams, GET} route +1ms
{/labs/:id/clients, GET} route +0ms
{/labs/:id, PATCH} route +0ms
{/docs, POST} route +0ms
{/docs/:docpath, GET} route +0ms
{/docs/:id, DELETE} route +1ms
{/receptionists, POST} route +10ms
{/receptionists, GET} route +1ms
{/receptionists/:id, GET} route +1ms
{/receptionists/:id/status, PATCH} route +1ms
{/receptionists/:id/diff, PATCH} route +0ms
{/receptionists/:id, DELETE} route +1ms
{/owners, POST} route +1ms
{/owners, GET} route +0ms
{/owners/:id, GET} route +0ms
{/owners/:id/status, PATCH} route +1ms
{/owners/:id/diff, PATCH} route +0ms
{/owners/:id, DELETE} route +0ms
{/managers, POST} route +0ms
{/managers, GET} route +9ms
{/managers/:id, GET} route +0ms
{/managers/:id, DELETE} route +0ms
{/managers/:id/status, PATCH} route +1ms
{/managers/:id/diff, PATCH} route +1ms
{/medicines, POST} route +1ms
{/medicines/:id, DELETE} route +0ms
