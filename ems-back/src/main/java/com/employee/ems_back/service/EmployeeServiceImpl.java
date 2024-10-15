package com.employee.ems_back.service;

import com.employee.ems_back.dto.EmployeeDto;
import com.employee.ems_back.entity.Employee;
import com.employee.ems_back.exception.ResourceNotFoundException;
import com.employee.ems_back.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private ModelMapper modelMapper;



    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        return (UserDetails) employeeRepository.findByEmail(emailId)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    //register

    @Override
    public Employee createEmployee(Employee employee) {
//        Employee employee1 = employeeRepository.findByEmail(employee.getEmail())
//                .orElseThrow(() -> new UsernameNotFoundException("user is already present"));
//        Employee employee1 = employeeRepository.findByEmail(employee.getEmail()).get();
//
//        if (employee1 != null) {
//            throw new UsernameNotFoundException("user already exists");
//        } else {
//            employee.setPassword(encoder.encode(employee.getPassword()));
//            employeeRepository.save(employee);
//        }
        employee.setPassword(encoder.encode(employee.getPassword()));
       return  employeeRepository.save(employee);

    }


    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new UsernameNotFoundException("Employee does not exist with ID: " + employeeId));
        return modelMapper.map(employee, EmployeeDto.class);
    }


    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(employee -> modelMapper.map(employee, EmployeeDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updatedEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        // Fetch the existing employee, or throw an exception if not found
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with ID: " + employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setRoles(updatedEmployee.getRoles());

        Employee updatedEmployeeObj = employeeRepository.save(employee);
        return modelMapper.map(updatedEmployeeObj, EmployeeDto.class);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->
                new ResourceNotFoundException("Employee does not exist with ID: " + employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
