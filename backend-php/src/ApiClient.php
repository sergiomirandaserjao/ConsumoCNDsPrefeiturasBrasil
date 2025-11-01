<?php
namespace Src;

require_once __DIR__ . '/Response.php';

use Src\Response;

class ApiClient
{
    /**
     * Consulta mockada da Prefeitura de São Paulo (SP Conecta)
     */
    public function consultarCND_SP(string $cnpj): void
    {
        // Aqui você futuramente chama a API real da PMSP via cURL
        // Exemplo real: https://api.conecta.prefeitura.sp.gov.br/
        $data = [
            'cidade' => 'São Paulo',
            'cnpj' => $cnpj,
            'status' => 'Regular',
            'emitido_em' => date('Y-m-d H:i:s'),
            'pdf_url' => "https://www.prefeitura.sp.gov.br/cnd/{$cnpj}.pdf"
        ];

        Response::success($data);
    }

    /**
     * Consulta mockada da Prefeitura de Curitiba
     */
    public function consultarCND_Curitiba(string $cnpj): void
    {
        $data = [
            'cidade' => 'Curitiba',
            'cnpj' => $cnpj,
            'status' => 'Regular',
            'emitido_em' => date('Y-m-d H:i:s'),
            'pdf_url' => "https://www.curitiba.pr.gov.br/cnd/{$cnpj}.pdf"
        ];

        Response::success($data);
    }

    /**
     * Consulta mockada da Prefeitura de Porto Alegre
     */
    public function consultarCND_PortoAlegre(string $cnpj): void
    {
        $data = [
            'cidade' => 'Porto Alegre',
            'cnpj' => $cnpj,
            'status' => 'Regular',
            'emitido_em' => date('Y-m-d H:i:s'),
            'pdf_url' => "https://www.portoalegre.rs.gov.br/cnd/{$cnpj}.pdf"
        ];

        Response::success($data);
    }
}
