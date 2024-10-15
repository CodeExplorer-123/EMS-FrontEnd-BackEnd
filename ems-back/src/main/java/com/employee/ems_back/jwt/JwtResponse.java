package com.employee.ems_back.jwt;

import com.employee.ems_back.dto.EmployeeDto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JwtResponse {

    private String token;
    private EmployeeDto employeeDto;

}