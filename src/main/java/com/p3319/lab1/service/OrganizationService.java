package com.p3319.lab1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.p3319.lab1.dto.common.AddressDto;
import com.p3319.lab1.dto.event.EventType;
import com.p3319.lab1.dto.organization.OrganizationRequestDto;
import com.p3319.lab1.dto.organization.OrganizationResponseDto;
import com.p3319.lab1.entity.Address;
import com.p3319.lab1.entity.Organization;
import com.p3319.lab1.exception.ConflictException;
import com.p3319.lab1.exception.ResourceNotFoundException;
import com.p3319.lab1.mapper.EntityMapper;
import com.p3319.lab1.repository.OrganizationRepository;
import com.p3319.lab1.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final ProductRepository productRepository;
    private final EntityMapper mapper;
    private final NotificationService notificationService;

    @Transactional(readOnly = true)
    public Page<OrganizationResponseDto> getAll(Pageable pageable) {
        return organizationRepository.findAll(pageable).map(mapper::toDto);
    }

    @Transactional(readOnly = true)
    public OrganizationResponseDto getById(Long id) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization with id " + id + " not found"));
        return mapper.toDto(organization);
    }

    @Transactional
    public OrganizationResponseDto create(OrganizationRequestDto dto) {
        Organization organization = mapper.toEntity(dto);
        Organization saved = organizationRepository.save(organization);
        OrganizationResponseDto responseDto = mapper.toDto(saved);
        notificationService.sendOrganizationEvent(EventType.CREATED, saved.getId(), responseDto);
        return responseDto;
    }

    @Transactional
    public OrganizationResponseDto update(Long id, OrganizationRequestDto dto) {
        Organization existing = organizationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization with id " + id + " not found"));

        existing.setName(dto.getName());
        existing.setAnnualTurnover(dto.getAnnualTurnover());
        existing.setEmployeesCount(dto.getEmployeesCount());
        existing.setRating(dto.getRating());
        existing.setType(dto.getType());

        updateAddress(existing.getOfficialAddress(), dto.getOfficialAddress());
        updateAddress(existing.getPostalAddress(), dto.getPostalAddress());

        Organization saved = organizationRepository.save(existing);
        OrganizationResponseDto responseDto = mapper.toDto(saved);
        notificationService.sendOrganizationEvent(EventType.UPDATED, saved.getId(), responseDto);
        return responseDto;
    }

    private void updateAddress(Address existingAddress, AddressDto dto) {
        if (existingAddress != null && dto != null) {
            existingAddress.setZipCode(dto.getZipCode());
            if (dto.getTown() == null) {
                existingAddress.setTown(null);
            } else if (existingAddress.getTown() != null) {
                existingAddress.getTown().setX(dto.getTown().getX());
                existingAddress.getTown().setY(dto.getTown().getY());
                existingAddress.getTown().setName(dto.getTown().getName());
            } else {
                existingAddress.setTown(mapper.toEntity(dto.getTown()));
            }
        }
    }

    @Transactional
    public void delete(Long id) {
        if (!organizationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Organization with id " + id + " not found");
        }
        if (productRepository.existsByManufacturerId(id)) {
            throw new ConflictException("Cannot delete organization: referenced by products");
        }

        organizationRepository.deleteById(id);
        notificationService.sendOrganizationEvent(EventType.DELETED, id, null);
    }
}
