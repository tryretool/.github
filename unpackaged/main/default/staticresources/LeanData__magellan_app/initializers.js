function initializePendingNodeDetailListPage(parsedMetrics) {
  initializePendingDetailModels(parsedMetrics);
  initializePendingDetail(parsedMetrics);
  initializePendingDetailView();
  initializePendingDetailTable();
  initializePendingDetailTableRow();

  var nodeDetailListPage = new Magellan.Views.PendingDetailView({});
  j$('#magellan-in-angela-container').html(nodeDetailListPage.$el);
}

// Previously defined in models.js
function initializeMagellanModels() {
  if (typeof Magellan === 'undefined') Magellan = {};

  if (typeof Magellan.Models === 'undefined') Magellan.Models = {};
}

// Previously defined in gui_controller.js
function initializeMagellanController() {
  if (typeof Magellan === 'undefined') {
    Magellan = {};
  }
  if (typeof Magellan.Controllers === 'undefined') {
    Magellan.Controllers = {};
  }

  Magellan.Controllers.GUI = Magellan.Controllers.GUI || {};

  // Legacy Handling
  Magellan.Controllers.GUI.appWaitingScreen = new Magellan.Views.WaitingScreen({
    container: '#app-waiting-screen',
  });

  // Legacy SVG prototype extension methods
  if (SVGElement && SVGElement.prototype) {
    SVGElement.prototype.hasClass = function (className) {
      return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.getAttribute('class'));
    };

    SVGElement.prototype.addClass = function (className) {
      if (!this.hasClass(className)) {
        this.setAttribute('class', this.getAttribute('class') + ' ' + className);
      }
    };
    SVGElement.prototype.removeClass = function (className) {
      var removedClass = this.getAttribute('class').replace(
        new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'),
        '$2'
      );
      if (this.hasClass(className)) {
        this.setAttribute('class', removedClass);
      }
    };
    SVGElement.prototype.toggleClass = function (className) {
      if (this.hasClass(className)) {
        this.removeClass(className);
      } else {
        this.addClass(className);
      }
    };
  }
}

function initializeBackboneApp() {
  initializeMagellanModels();
  initializeMagellanValidation();

  initializeNewViews();
  initializeMagellanController();

  Magellan.Controllers.AccountRouter.initialize();
  Magellan.Controllers.CaseRouter.initialize();
  Magellan.Controllers.ContactRouter.initialize();
  Magellan.Controllers.OpportunityRouter.initialize();
}

function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerText = input;
  return e.childNodes.length === 0 ? '' : _.escape(e.childNodes[0].nodeValue);
}

window.initializeApp = function () {
  $('div.container').addClass('container-fluid').removeClass('container');
  $('div.row').removeClass('row').addClass('row-fluid');
  if (typeof graphImages === 'undefined') graphImages = [];
  initializeBackboneApp();
  initializeMagellanModals();
};

function initializeMagellanModals() {
  const magellanModalsElement = $('#magellan-modals');
  magellanModalsElement.empty();

  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'delete-territory-segment',
      headerText: 'Delete Territory Segment',
      mainText:
        'Warning: Are you sure you want to delete this Segment? It will no longer be available in FlowBuilder.',
      button1Name: 'Cancel',
      button2Name: 'Yes, Delete Territory Segment',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'save-as',
      headerText: 'Enter new graph name',
      mainText: 'Note: You are saving a copy and will be allowed to edit.',
      button1Name: 'Cancel',
      button2Name: 'OK',
      button1Action: null,
      button2Action: null,
    })
  );
  $('#save-as-extra').html(
    "<div class='row' style='width:100%;'><div class='col col-xs-3 text-right' style='padding-top: 6px;'>Name:</div><div class='col col-xs-9'><input type='text'></div></div>"
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'deployment-save-as',
      headerText: 'Save a Copy',
      mainText: 'Save a copy of this graph to make it available for deployment.',
      button1Name: 'Cancel',
      button2Name: 'OK',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'save-and-deploy',
      headerText: 'Are you sure you want to save and deploy?',
      mainText: 'Note: The changes you made will be saved and made live.',
      button1Name: 'Cancel',
      button2Name: 'OK',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'dirty',
      headerText: 'Are you sure you want to leave this panel?',
      mainText:
        'You have unsaved changes that will be lost. Press "Leave Without Saving" to leave or Cancel to stay on the page.',
      button1Name: 'Cancel',
      button2Name: 'Leave Without Saving',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'dirty-close-graph',
      headerText: 'Are you sure you want to leave this graph?',
      mainText:
        'You have unsaved changes that will be lost. Press OK to leave or Cancel to stay on the page.',
      button1Name: 'Cancel',
      button2Name: 'OK',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-rename',
      headerText: 'Edit Segment',
      mainText: territory_rename,
      button1Name: 'Cancel',
      button2Name: 'Rename Segment',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-create',
      headerText: 'Create Territory Segment',
      mainText: territory_create,
      button1Name: 'Cancel',
      button2Name: 'Create',
      button1Action: null,
      button2Action: null,
    })
  );

  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-add',
      headerText: 'Add Territory Segment Manager',
      mainText: territory_add,
      button1Name: 'Cancel',
      button2Name: 'Add Manager(s)',
      button1Action: null,
      button2Action: null,
    })
  );

  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-edit',
      headerText: 'Edit Territory Segment Info',
      mainText: territory_edit,
      button1Name: 'Cancel',
      button2Name: 'Update Segment Info',
      button1Action: null,
      button2Action: null,
    })
  );

  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-copy',
      headerText: 'Copy Territory Segment',
      mainText: territory_copy,
      button1Name: 'Cancel',
      button2Name: 'Copy Segment',
      button1Action: null,
      button2Action: null,
    })
  );

  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-replace',
      headerText: 'Replace Territory Segment',
      mainText:
        'Warning: Uploading another CSV will overwrite and replace this one. Are you sure you want to overwrite this Segment?',
      button1Name: 'Cancel',
      button2Name: 'Yes, Replace Territory Segment',
      button1Action: null,
      button2Action: null,
    })
  );
  magellanModalsElement.append(
    _.template(modal_template)({
      uniqueId: 'territory-deploy',
      headerText: 'Deploy Draft Version',
      mainText:
        'Are you sure you want to overwrite your deployed territory data with this draft version?',
      button1Name: 'Cancel',
      button2Name: 'OK',
      button1Action: null,
      button2Action: null,
    })
  );

  // All modals are always in front
  $('#magellan-modals')
    .children()
    .each(function () {
      $(this).css('z-index', 2147483647);
    });
}
//# sourceURL=magellan/initializers.js
