package com.employee.ems_back.controller;


import com.employee.ems_back.dto.EmployeeDto;
import com.employee.ems_back.entity.Employee;
import com.employee.ems_back.exception.ResourceNotFoundException;
import com.employee.ems_back.jwt.AuthRequest;
import com.employee.ems_back.jwt.JwtResponse;
import com.employee.ems_back.jwt.JwtUtils;
import com.employee.ems_back.repository.EmployeeRepository;
import com.employee.ems_back.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AuthController {



    private EmployeeService employeeService;
    private EmployeeRepository employeeRepository;
    private ModelMapper modelMapper;

    private AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
        this.authenticate(authRequest.getEmail(), authRequest.getPassword());
        UserDetails userDetails = employeeService.loadUserByUsername(authRequest.getEmail());
        String token = jwtUtils.generateToken(userDetails.getUsername());
        Employee employee = employeeRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not available"));
        return ResponseEntity.ok().body(
                new JwtResponse(token, modelMapper.map(employee, EmployeeDto.class))
        );

    }

    private void authenticate(String username,String password) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username,password);
        try {
            this.authenticationManager.authenticate(authenticationToken);
        } catch (DisabledException e) {
            throw new DisabledException("user is disabled");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("bad credentials");
        }
    }
}
