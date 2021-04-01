import React from 'react';

import {
    Formik,
    Form,
    Field,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button
  } from "@chakra-ui/react"


function Autor_Form() {
    function validateName(value) {
        let error
        if (!value) {
          error = "Este Campo es Requerido"
        }
        return error
      }
    
      return (
        <FormControl id="first-name" isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" />
        </FormControl>
      )
}
export default Autor_Form;