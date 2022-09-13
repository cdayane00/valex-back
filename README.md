 - POST /card/create
    * Cria um novo card
    * headers: {
        "x-api-key": "adKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
    }
    * body: {
        "employeeId": 7, 
		"cardType": "blabala"
    }
    * response: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30",
		"securityCode": "242"
    }

 - PUT /card/active
    * Ativa um card
    * body: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30",
		"securityCode": "242,
		"password": "0002"
    }

 - PUT /card/block
    * Bloqueia um card
    * body: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30",
		"password": "0002"
    }

 - PUT /card/unblock
    * Desbloqueia um card
    * body: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30",
		"password": "0002"
    }

 - GET /card/statement
    * Obtém extrato de um card
    * body: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30"
    }

 - POST /card/recharge
    * Faz uma recarga no card
    * headers: {
        "x-api-key": "adKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"	
    }
    * body: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30",
        "amount": 200.00
    }

 - POST /card/payment/:businessId
    * Faz pagamento
    * body: {
        "number": "4646 2045 9090 8080",
		"cardholderName": "Silva N Silva",
		"expirationDate": "11/30",
		"password": "0002",
        "amount": 100.00
    }


