import { IndexPage, GridColPage, GridRowPage } from './page-models';

fixture `Initial tests`;

test('check element existence', async t => {
    const indexPage = new IndexPage();

    await t.navigateTo(indexPage.url)
        .expect(indexPage.gridColLink.exists).ok()
        .expect(indexPage.gridRowLink.exists).ok()
        .expect(indexPage.mainContainer.exists).ok();
});

test('check block sizes', async t => {
    const gridColPage = new GridColPage();
    const gridRowPage = new GridRowPage();

    await t.navigateTo(gridColPage.url)
        .expect(gridColPage.colums.count).eql(12)
        .resizeWindow(500, 500)
        .expect(gridColPage.colums.nth(0).clientWidth).eql(29)
        .navigateTo(gridRowPage.url)
        .expect(gridRowPage.rows.count).eql(12)
        .resizeWindow(500, 500)
        .expect(gridRowPage.rows.clientWidth).eql(175);
});


