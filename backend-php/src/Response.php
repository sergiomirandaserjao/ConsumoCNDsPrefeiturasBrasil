<?php
namespace Src;

class Response
{
    /**
     * Retorna resposta JSON padronizada
     */
    public static function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    /**
     * Retorna erro padronizado
     */
    public static function error(string $message, int $status = 400): void
    {
        self::json([
            'success' => false,
            'error' => $message,
            'timestamp' => date('Y-m-d H:i:s')
        ], $status);
    }

    /**
     * Retorna sucesso padronizado
     */
    public static function success(array $data, int $status = 200): void
    {
        self::json(array_merge([
            'success' => true,
            'timestamp' => date('Y-m-d H:i:s')
        ], $data), $status);
    }
}
