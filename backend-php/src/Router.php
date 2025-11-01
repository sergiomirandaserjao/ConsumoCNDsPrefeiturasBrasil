<?php
namespace Src;

require_once __DIR__ . '/ApiClient.php';
require_once __DIR__ . '/Response.php';

use Src\ApiClient;
use Src\Response;

class Router
{
    public static function handleRequest(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $cidade = $_GET['cidade'] ?? null;

        if ($method !== 'POST') {
            Response::error('Método não permitido. Use POST.', 405);
        }

        $input = json_decode(file_get_contents('php://input'), true);
        $cnpj = $input['cnpj'] ?? null;

        if (!$cidade) {
            Response::error('Informe a cidade via parâmetro ?cidade=', 400);
        }

        if (!$cnpj) {
            Response::error('Informe o CNPJ no corpo JSON da requisição.', 400);
        }

        $api = new ApiClient();

        switch (strtolower($cidade)) {
            case 'sp':
            case 'sao-paulo':
            case 'são-paulo':
                $api->consultarCND_SP($cnpj);
                break;

            case 'curitiba':
                $api->consultarCND_Curitiba($cnpj);
                break;

            case 'porto-alegre':
                $api->consultarCND_PortoAlegre($cnpj);
                break;

            default:
                Response::error('Cidade não suportada neste ambiente de teste.', 404);
                break;
        }
    }
}
