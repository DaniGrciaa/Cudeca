-- Agregar columna profile_completed para rastrear si el usuario completó su perfil
ALTER TABLE usuario ADD COLUMN profile_completed BOOLEAN DEFAULT false NOT NULL;

-- Actualizar usuarios existentes con registro LOCAL como perfil completado
UPDATE usuario SET profile_completed = true WHERE provider = 'LOCAL';

-- Actualizar usuarios OAuth2 basándose en si tienen datos de perfil completos
-- (teléfono y al menos una dirección)
UPDATE usuario u
SET profile_completed = true
WHERE u.provider IN ('GOOGLE', 'FACEBOOK')
  AND u.telefono IS NOT NULL
  AND EXISTS (SELECT 1 FROM direccion d WHERE d.id_usuario = u.id_user);

-- Los usuarios OAuth2 sin teléfono o dirección se marcan como perfil incompleto
-- (ya tienen profile_completed = false por defecto)

