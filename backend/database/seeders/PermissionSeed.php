<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roleAdministrator = Role::create(['name'=>'Administrator']);
        $roleMaster = Role::create(['name'=>'Master']);
        $roleAssistant = Role::create(['name'=>'Assistant']);
        $roleStudent = Role::create(['name'=>'Student']);

         //PERMISOS DE GENERO Y MATERIAL

        $GenderCreate = Permission::create(['name'=>'GenderCreate']);
        $GenderUpdate = Permission::create(['name'=>'GenderUpdate']);
        $GenderDelete = Permission::create(['name'=>'GenderDelete']);
        $GenderIndex = Permission::create(['name' =>'GenderIndex']);
        $GenderShow =Permission::create(['name'=>'GenderShow']);



         //ASIGNACION DE ROL A PERMISOS

         // GENDER
        $roleAdministrator ->givePermissionTo($GenderCreate);
        $roleAdministrator ->givePermissionTo($GenderUpdate);
        $roleAdministrator ->givePermissionTo($GenderDelete);
        $roleAdministrator ->givePermissionTo($GenderIndex);
        $roleAdministrator ->givePermissionTo($GenderShow);
    }



}
