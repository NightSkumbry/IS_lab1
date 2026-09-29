package com.p3319.lab1.exception;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.boot.webmvc.error.ErrorController;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaErrorController implements ErrorController {

    @RequestMapping("/error")
    public Object error(HttpServletRequest request, HttpServletResponse response) {
        String path = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        boolean isApiRequest = path != null && path.startsWith("/api/");

        if (!isApiRequest && HttpMethod.GET.name().equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpStatus.OK.value());
            return "forward:/index.html";
        }

        return ResponseEntity.notFound().build();
    }
}
