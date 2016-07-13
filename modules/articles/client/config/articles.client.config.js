'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'การประชุม',
      state: 'articles',
      type: 'dropdown',
      roles: ['user']
    });
    Menus.addMenuItem('topbar', {
      title: 'คู่มือการใช้งาน',
      state: 'articles.manual',
      roles: ['*']
    });
    Menus.addMenuItem('topbar', {
      title: 'ติดต่อสอบถาม',
      state: 'articles.contact',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'การประชุมทั้งหมด',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'สร้างการประชุมใหม่',
      state: 'articles.create',
      roles: ['user']
    });
  }
]);


