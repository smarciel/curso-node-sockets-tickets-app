const fs = require('fs');

class Ticket {
    constructor(num, desktop) {
        this.num = num;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];

        let data = require('../data/data.json');
        console.log(data);

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFourTickets = data.lastFourTickets;
        } else {
            this.restartCounter();
        }
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFourTicket() {
        return this.lastFourTickets;
    }

    attendTicket(desktop) {
        if (this.tickets.length == 0) {
            return 'No hay tickets';
        }

        let numTicket = this.tickets[0].num; //eliminar referencia propia del JS
        this.tickets.shift();

        let ticket = new Ticket(numTicket, desktop);
        this.lastFourTickets.unshift(ticket); //agregar al inicio del array

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1); //borra el último elemento del array
        }

        console.log('Últimos 4: ', this.lastFourTickets);

        this.saveFile();

        return ticket;
    }

    restartCounter() {
        this.last = 0;
        this.tickets = [];
        this.lastFourTickets = [];
        console.log('Se ha reiniciado el sistema.');
        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            "last": this.last,
            "today": this.today,
            "tickets": this.tickets,
            "lastFourTickets": this.lastFourTickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}