INSERT INTO ORIGENES (ORIGEN, created_at, updated_at) VALUES
('Virus experimental', NOW(), NOW()),
('Radiación nuclear', NOW(), NOW()),
('Magia oscura', NOW(), NOW()),
('Parásito alienígena', NOW(), NOW()),
('Nanobots descontrolados', NOW(), NOW());

INSERT INTO ZOMBIES (NOMBRE, DESCRIPCION, ORIGEN_ID, VELOCIDAD, FUERZA, RESISTENCIA, HUMANIDAD, created_at, updated_at) VALUES
('Zombie Corredor', 'Extremadamente rápido pero frágil.', 1, 9, 4, 3, 1, NOW(), NOW()),
('Zombie Radiactivo', 'Brilla en la oscuridad y es tóxico al contacto.', 2, 3, 7, 6, 2, NOW(), NOW()),
('Necrozombi', 'Reanimado por rituales arcanos, resistente a las armas comunes.', 3, 2, 5, 9, 0, NOW(), NOW()),
('Huésped Alienígena', 'Controlado por un parásito que le da fuerza sobrehumana.', 4, 5, 8, 7, 3, NOW(), NOW()),
('Zombie Cibernético', 'Infectado con nanobots, con partes metálicas en el cuerpo.', 5, 6, 6, 8, 4, NOW(), NOW());