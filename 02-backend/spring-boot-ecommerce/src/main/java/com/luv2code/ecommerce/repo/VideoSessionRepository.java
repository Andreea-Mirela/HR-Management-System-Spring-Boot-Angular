package com.luv2code.ecommerce.repo;

import com.luv2code.ecommerce.model.VideoSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

public interface VideoSessionRepository extends JpaRepository<VideoSession, Long> {
    VideoSession findFirstBySessionDateTimeAfterOrderBySessionDateTimeAsc(OffsetDateTime sessionDateTime);
    @Query("SELECT vs FROM VideoSession vs WHERE vs.sessionDateTime > :currentDateTime ORDER BY vs.sessionDateTime ASC")
    List<VideoSession> findLatestVideoSessions(@Param("currentDateTime") String currentDateTime);

}
