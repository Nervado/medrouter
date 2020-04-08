# medrouter

This is a educational project and was made as step to finish the web applications development course of PUC-Minas University

# General Features

## MedRouter - Sistema de Gerenciamento de Clinica Médica

... Requisitos genéricos...Paginas acessiveis apenas a médicos, paginas acessíveis a pacientes,
paginas acessiveis ao dono da clinica ou donos, emissao de notas ficais ?? para pagamentos particulares
incluir integracao automatizada de pagamento.

.. Incluir integracao com outros tipos de sistema, incluir integracao com equipamento de fotografia para registrar o paciente
.. Incluir leitura de digital ...
.. Incluir possibilidade do paciente introduzir a foto ??? apenas se houver integracao com sistema de login via redes sociais.
.. Incluir campo para queixas dos pacientes, preview do assunto da consulta??
.. Incluir tipos de consultas... emergencial, agendada.
.. Verificar estrategia possivel para lidar com os documentos gerados...manter backup na nuvem ? local ? sincronizacdo.

1. Deve possibilitar o cadastro de todos os tipos de usuários
2. Deve controlar o numero de dias e horario de marcacao de consultas
3. Gerenciar o cadastro de pacientes
4. O sistema devera controlar o historico clinico do paciente
5. O historico devera conter as consultas, remedios prescritos, exames prescritos e realizados
6. Tambem devera marcar o retorno ou nao do paciente a clinca.
7. O sistema deverá gerenciar a marcacao de consultas de acordo com o agendamento dos medicos.
8. O sistema devera gerenciar cancelamentos e marcacoes de consultas.
9. O sistema deverá manter em banco o histórico de receitas fornecidas aos pacientes.
10. O Sistema deve gerenciar o historico de emissao de requiscao se exames dos pacientes≥
11. O sistema pode fornecer integracao de login usando midias sociais ... facebook e google.
12. O sistema devera gerenciar os tipos de examples possiveis que serao inseridos diretamente na base de dados.
    Obs. Os exames nao serao cadastrado, porem apenas inseridos na base de dados . Indicar um droplist para isso.
13. O sistema deverá gerenciar os tipos de medicamentos que poderão ser receitados aos pacientes. Contendo,
    fabricante, nome genérico, nome de fabrica.
14. Realizar soft delete dos usuários.
15. Incluir responsividade.
16. Devo usar apenas boostrap..? Verificar com a coordenação.

## Histórias de usuário.

**PACIENTE**

Eu como cliente da clinica posso solicitar consultas online, escolhendo datas e horários disponiveis.
Eu como cliente da clinica devo poder consultar meu historico de atendimentos, de acordo com tipo de especilidade.
Eu como cliente da clinica devo poder consultar meu historico de receitas prescritas.
Eu como cliente da clinica posso solicitar remarcação ou cancelamento de uma consulta.
Eu como cliente da clinica posso escrever ao médico antecipando minhas queixas de saúde.
Eu como cliente da clinica posso consultar meu histórico de exames.
Eu como paciente devo ser capaz de enviar copia dos meus documentos para adiantar o cadastro na clinica.

**MÉDICO**

Eu como médico posso visualizar o histórico de meus pacientes.
Eu como médico devo ser capaz de cadastrar mes a mes minha agenda de atendimentos.
Eu como médico devo ser capaz de cancelar antedimentos se necessário.
Eu como médico devo ser capaz de visualizar a lista de medicamentos que posso prescrever e incluílos na receita
Eu como médico devo ser capaz de visualizar as receitas emitidas.
Eu como médico devo ser capaz de visualizar os exames dos pacientes.
Eu como médico devo ser capaz de visualizar o total de receita estimado de acordo com o numero de consultas marcadas.
Eu como medico devo ser capaz de visualizar a estatisca de atendimentos disponiveis e tambem um ranking de avaliacao de
atendimento.

**GERENTE**

Eu como gerente devo ser capaz de gerenciar novas/os recepcionistas da clinica
Eu como gerente devo ser capaz de consultar dados da quantidade de consultas marcadas. Horarios disponiveis
Estatisticas de atendimento. Faturamento de Clinica via meios de pagamentos integrados.
Eu como gerente devo ser capaz de visualizar os dados de avaliacao de qualidade da clinica.

**RECEPCIONISTA**

Eu como recepcionita da clinica devo ser capaz de marcar consultas para pacientes prensencialmente.
Eu como re... devo ser capaz de indicar se é atendimento agendado ou emergencia.
Eu como re ... devo ser capaz de cadastrar presencialmente os pacientes, completar ou alterar cadastros.
Eu como re .. deve ser capaz de verificar a agenda de determinado médico.
Eu como re .. devo ser capaz de realizar encaixes de consulta.
Eu como re .. deve ser capaz de escanear documentos de identificacao dos pacientes.

**ACTORS**

- Owner - Dono da Clinica/Gerente
- Manager - Gerente da Clinica
- Client - Paciente da Clinica
- Doctor - Médico da Clinica
- Recept - Recepcionista
