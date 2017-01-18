import { Selector } from 'testcafe';

export class GridColPage {
    constructor () {
        this.colums = Selector('.sl-col-1.bg-turquoise');
        this.url    = 'http://localhost:8080/docs/grid-col.html';
    }
}

export class GridRowPage {
    constructor () {
        this.rows = Selector('.sl-row-1.bg-turquoise');
        this.url  = 'http://localhost:8080/docs/grid-row.html';
    }
}

export class IndexPage {
    constructor () {
        const aside = Selector('aside');

        this.gridColLink   = aside.find('a').withText('grid-row');
        this.gridRowLink   = aside.find('a').withText('grid-col');
        this.mainContainer = Selector('.bg-cadetblue');
        this.url           = 'http://localhost:8080/docs/index';
    }
}
