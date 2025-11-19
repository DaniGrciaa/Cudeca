SELECT setval('usuario_id_user_seq', (SELECT MAX(id_user) FROM usuario));

-- -- ============================================================
