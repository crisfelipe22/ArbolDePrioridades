// JavaScript Document

class Tree {
    MAXIMO = 100;
    cont;
    a;

    constructor() {
        this.cont = 0;
        this.a = [];
        this.a[0] = Number.MAX_SAFE_INTEGER;
    }
}

class ColasPrioridad {
    m;
    constructor() {
        this.m = new Tree();
    }

    creaP(dato) {
        var i, j;
        this.m.cont++;
        i = this.m.cont;
        j = parseInt(i / 2);

        while (this.m.a[j] < dato) {
            this.m.a[i] = this.m.a[j];
            i = j;
            j = parseInt(i / 2);
        }
        this.m.a[i] = dato;
    }

    retirarP() {
        var i, j, temp, elemento;
        elemento = this.m.a[1];
        temp = this.m.a[this.m.cont];
        this.m.cont--;
        i = 1;
        j = 2;
        while (j <= this.m.cont) {
            if (j < this.m.cont) {
                if (this.m.a[j] <= this.m.a[j + 1]) {
                    j++;
                }

            }
            if (temp >= this.m.a[j]) {
                break;
            }
            this.m.a[i] = this.m.a[j];
            i = j;
            j = 2 * i;
        }
        this.m.a[i] = temp;
        //delete(this.m.a[this.m.cont]);
        this.m.a.splice(this.m.cont + 1, 1);
        return elemento;
    }

    draw()//recorre el arreglo para dibujarlo
    {
        for (var i = 1; i < this.m.a.length; i++) {
            if (i === 1) {
                treeDraw.addNode("root", null, this.m.a[i]);
            } else {
                var raiz, string;
                if ((i % 2) === 0) {
                    string = "left";
                }
                else {
                    string = "right";
                }
                treeDraw.addNode(parseInt(i / 2), string, this.m.a[i]);
            }

        }
    }
}

class Node {
    id;
    value;
    left;
    right;
    parent;

    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class TreeDraw {
    head;
    nodeCounter;

    constructor() {
        this.head = null;
        this.nodeCounter = 0;
    }

    //Buscar nodo por id, se usa solo para añadir nodos al buscar al padre, 
    //el id permite que existan varios nodos con el mismo valor y que se puedan añadir en el punto deseado
    //además permite llevar facilmente el conteo de nodos en un árbol
    findId(head, id) {
        if (head !== null) {
            var leftSearch = this.findId(head.left, id);
            var rightSearch = this.findId(head.right, id);

            if (parseInt(id) === head.id) {
                return head;
            } else if (leftSearch !== false) {
                return leftSearch;
            } else if (rightSearch !== false) {
                return rightSearch;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    addNode(parentId, direction, value) {
        if (parentId === "root") {
            if (this.head == null) {
                this.nodeCounter++;
                var newNode = new Node(this.nodeCounter, value);
                this.head = newNode;
                return true;
            } else {
                //alert("El nodo ya esta ocupado.");
                return false;
            }

        } else {
            var parentNode = this.findId(this.head, parentId);

            if (direction === "left") {
                if (parentNode.left === null) {
                    this.nodeCounter++;
                    var newNode = new Node(this.nodeCounter, value);
                    newNode.parent = parentNode;
                    parentNode.left = newNode;
                    return true;
                } else {
                    //alert("El nodo ya esta ocupado.");
                    return false;
                }

            } else if (direction === "right") {
                if (parentNode.right === null) {
                    this.nodeCounter++;
                    var newNode = new Node(this.nodeCounter, value);
                    newNode.parent = parentNode;
                    parentNode.right = newNode;
                    return true;
                } else {
                    //alert("El nodo ya esta ocupado.");
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    toHTML(head) {
        var html = "";

        if (head === null) {
            return '<li><span class="px-2 py-1">*</span></li>';
        } else {
            var htmlLeft = this.toHTML(head.left);
            var htmlRight = this.toHTML(head.right);

            html = '<li>' +
                '<div class="rounded-pill px-2 py-1" >' + head.value + '</div>';

            if (!(head.left === null && head.right === null)) {

                html += '<ul>' +
                    htmlLeft +
                    htmlRight +
                    '</ul>' +
                    '</li>';
            }

            html += '</li>';
        }
        return html;
    }
}

var treeDraw = new TreeDraw();
var colasPrioridad = new ColasPrioridad();

function printTrees() {
    treeDraw.head = null;
    treeDraw.nodeCounter = 0;
    colasPrioridad.draw();
    if (treeDraw.head === null) {//si aun no hay raiz        
        $('#ulTree').html("Árbol vacío");
    } else {
        $('#ulTree').html(treeDraw.toHTML(treeDraw.head));//imprimir arbol
    }
}

function insertNode() {
    colasPrioridad.creaP(parseInt($('#numberTxt').val()));
    printTrees();
    $('#numberTxt').val("");
    $('#numberTxt').focus();
}

function deleteRoot() {
    if (colasPrioridad.m.a.length > 1) {
        var retira = colasPrioridad.retirarP();
        alert("El valor retirado es: " + retira);
        printTrees();
        $('#numberTxt').focus();
    }
    else {
        alert("No se puede eliminar por que el árbol esta vacio.");
    }
}