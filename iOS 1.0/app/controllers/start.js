function openLogin () {
    Alloy.Globals.index.view_login = Alloy.createController('login').getView();
    Alloy.Globals.index.add(Alloy.Globals.index.view_login);
    
    Alloy.Globals.index.remove(Alloy.Globals.index.view_start);
}