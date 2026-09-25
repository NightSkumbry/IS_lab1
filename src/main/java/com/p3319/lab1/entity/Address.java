package com.p3319.lab1.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 6, message = "Address.zipCode length must be at least 6")
    @Column(name = "zip_code")
    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "town_id")
    private Location town;
}
