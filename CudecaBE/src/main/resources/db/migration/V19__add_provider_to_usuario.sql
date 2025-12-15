-- V19: Add provider column to usuario table for OAuth2 support
-- This column will store the authentication provider: LOCAL, GOOGLE, FACEBOOK

ALTER TABLE usuario
ADD COLUMN provider VARCHAR(20) DEFAULT 'LOCAL';

-- Update existing users to have LOCAL provider
UPDATE usuario
SET provider = 'LOCAL'
WHERE provider IS NULL;

