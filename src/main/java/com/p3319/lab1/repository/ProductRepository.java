package com.p3319.lab1.repository;

import com.p3319.lab1.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    Page<Product> findAllByManufacturerId(Long manufacturerId, Pageable pageable);
    boolean existsByManufacturerId(Long manufacturerId);
    boolean existsByOwnerId(Long ownerId);
}
