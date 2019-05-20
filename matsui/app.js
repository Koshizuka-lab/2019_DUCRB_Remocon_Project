(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.cc.aZ === region.cw.aZ)
	{
		return 'on line ' + region.cc.aZ;
	}
	return 'on lines ' + region.cc.aZ + ' through ' + region.cw.aZ;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d4,
		impl.ez,
		impl.eu,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		cY: func(record.cY),
		dr: record.dr,
		c9: record.c9
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.cY;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.dr;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.c9) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d4,
		impl.ez,
		impl.eu,
		function(sendToApp, initialModel) {
			var view = impl.bV;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d4,
		impl.ez,
		impl.eu,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.a9 && impl.a9(sendToApp)
			var view = impl.bV;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dR);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ev) && (_VirtualDom_doc.title = title = doc.ev);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.ee;
	var onUrlRequest = impl.ef;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		a9: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.dd === next.dd
							&& curr.cK === next.cK
							&& curr.c7.a === next.c7.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		d4: function(flags)
		{
			return A3(impl.d4, flags, _Browser_getUrl(), key);
		},
		bV: impl.bV,
		ez: impl.ez,
		eu: impl.eu
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { d2: 'hidden', dT: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { d2: 'mozHidden', dT: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { d2: 'msHidden', dT: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { d2: 'webkitHidden', dT: 'webkitvisibilitychange' }
		: { d2: 'hidden', dT: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		dj: _Browser_getScene(),
		dI: {
			U: _Browser_window.pageXOffset,
			V: _Browser_window.pageYOffset,
			dL: _Browser_doc.documentElement.clientWidth,
			c: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		dL: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		c: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			dj: {
				dL: node.scrollWidth,
				c: node.scrollHeight
			},
			dI: {
				U: node.scrollLeft,
				V: node.scrollTop,
				dL: node.clientWidth,
				c: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			dj: _Browser_getScene(),
			dI: {
				U: x,
				V: y,
				dL: _Browser_doc.documentElement.clientWidth,
				c: _Browser_doc.documentElement.clientHeight
			},
			dV: {
				U: x + rect.left,
				V: y + rect.top,
				dL: rect.width,
				c: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.v.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.v.b, xhr)); });
		elm$core$Maybe$isJust(request.C) && _Http_track(router, xhr, request.C.a);

		try {
			xhr.open(request.ea, request.eA, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.eA));
		}

		_Http_configureRequest(xhr, request);

		request.dR.a && xhr.setRequestHeader('Content-Type', request.dR.a);
		xhr.send(request.dR.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.d1; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.ce.a || 0;
	xhr.responseType = request.v.d;
	xhr.withCredentials = request.an;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		eA: xhr.responseURL,
		er: xhr.status,
		es: xhr.statusText,
		d1: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			ep: event.loaded,
			ca: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			ek: event.loaded,
			ca: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var author$project$Material$defaultModel = {ck: elm$core$Dict$empty, cn: elm$core$Dict$empty, co: elm$core$Dict$empty, ct: elm$core$Dict$empty, b1: elm$core$Dict$empty, cy: elm$core$Dict$empty, cL: elm$core$Dict$empty, cU: elm$core$Dict$empty, o: elm$core$Dict$empty, df: elm$core$Dict$empty, R: elm$core$Dict$empty, $7: elm$core$Dict$empty, dp: elm$core$Dict$empty, bb: elm$core$Dict$empty, du: elm$core$Dict$empty, dw: elm$core$Dict$empty, dA: elm$core$Dict$empty, cf: elm$core$Dict$empty, dF: elm$core$Dict$empty};
var author$project$Main$defaultModel = {aw: elm$core$Dict$empty, Y: 'switch light', ay: author$project$Material$defaultModel};
var elm$core$Basics$False = 1;
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.g) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.i),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.i);
		} else {
			var treeLen = builder.g * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.j) : builder.j;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.g);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.i) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.i);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{j: nodeList, g: (len / elm$core$Array$branchFactor) | 0, i: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (_n0) {
	return _Utils_Tuple2(author$project$Main$defaultModel, elm$core$Platform$Cmd$none);
};
var author$project$Main$Mdc = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$map = _Platform_map;
var author$project$Internal$Component$subs = F5(
	function (ctor, get, subscriptions, lift, model) {
		return elm$core$Platform$Sub$batch(
			A3(
				elm$core$Dict$foldl,
				F3(
					function (idx, state, ss) {
						return A2(
							elm$core$List$cons,
							A2(
								elm$core$Platform$Sub$map,
								A2(
									elm$core$Basics$composeL,
									lift,
									ctor(idx)),
								subscriptions(state)),
							ss);
					}),
				_List_Nil,
				get(model)));
	});
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Internal$Drawer$Implementation$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Internal$Msg$DrawerMsg = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var author$project$Internal$Drawer$Implementation$subs = A3(
	author$project$Internal$Component$subs,
	author$project$Internal$Msg$DrawerMsg,
	function ($) {
		return $.b1;
	},
	author$project$Internal$Drawer$Implementation$subscriptions);
var author$project$Internal$Menu$Model$DocumentClick = {$: 7};
var elm$browser$Browser$Events$Document = 0;
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {c6: pids, dt: subs};
	});
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {b2: event, cQ: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cG: fragment, cK: host, c5: path, c7: port_, dd: protocol, de: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.c6,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.cQ;
		var event = _n0.b2;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.dt);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onClick = A2(elm$browser$Browser$Events$on, 0, 'click');
var elm$core$Basics$neq = _Utils_notEqual;
var author$project$Internal$Menu$Implementation$subscriptions = function (model) {
	return (model.l && (!_Utils_eq(model.av, elm$core$Maybe$Nothing))) ? elm$browser$Browser$Events$onClick(
		elm$json$Json$Decode$succeed(author$project$Internal$Menu$Model$DocumentClick)) : elm$core$Platform$Sub$none;
};
var author$project$Internal$Msg$MenuMsg = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var author$project$Internal$Menu$Implementation$subs = A3(
	author$project$Internal$Component$subs,
	author$project$Internal$Msg$MenuMsg,
	function ($) {
		return $.o;
	},
	author$project$Internal$Menu$Implementation$subscriptions);
var author$project$Material$subscriptions = F2(
	function (lift, model) {
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					A2(author$project$Internal$Drawer$Implementation$subs, lift, model.ay),
					A2(author$project$Internal$Menu$Implementation$subs, lift, model.ay)
				]));
	});
var author$project$Main$subscriptions = function (model) {
	return A2(author$project$Material$subscriptions, author$project$Main$Mdc, model);
};
var author$project$Main$GotServerResponse = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$defaultTABState = {a6: false};
var elm$core$String$foldl = _String_foldl;
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var truqu$elm_base64$Base64$Encode$intToBase64 = function (i) {
	switch (i) {
		case 0:
			return 'A';
		case 1:
			return 'B';
		case 2:
			return 'C';
		case 3:
			return 'D';
		case 4:
			return 'E';
		case 5:
			return 'F';
		case 6:
			return 'G';
		case 7:
			return 'H';
		case 8:
			return 'I';
		case 9:
			return 'J';
		case 10:
			return 'K';
		case 11:
			return 'L';
		case 12:
			return 'M';
		case 13:
			return 'N';
		case 14:
			return 'O';
		case 15:
			return 'P';
		case 16:
			return 'Q';
		case 17:
			return 'R';
		case 18:
			return 'S';
		case 19:
			return 'T';
		case 20:
			return 'U';
		case 21:
			return 'V';
		case 22:
			return 'W';
		case 23:
			return 'X';
		case 24:
			return 'Y';
		case 25:
			return 'Z';
		case 26:
			return 'a';
		case 27:
			return 'b';
		case 28:
			return 'c';
		case 29:
			return 'd';
		case 30:
			return 'e';
		case 31:
			return 'f';
		case 32:
			return 'g';
		case 33:
			return 'h';
		case 34:
			return 'i';
		case 35:
			return 'j';
		case 36:
			return 'k';
		case 37:
			return 'l';
		case 38:
			return 'm';
		case 39:
			return 'n';
		case 40:
			return 'o';
		case 41:
			return 'p';
		case 42:
			return 'q';
		case 43:
			return 'r';
		case 44:
			return 's';
		case 45:
			return 't';
		case 46:
			return 'u';
		case 47:
			return 'v';
		case 48:
			return 'w';
		case 49:
			return 'x';
		case 50:
			return 'y';
		case 51:
			return 'z';
		case 52:
			return '0';
		case 53:
			return '1';
		case 54:
			return '2';
		case 55:
			return '3';
		case 56:
			return '4';
		case 57:
			return '5';
		case 58:
			return '6';
		case 59:
			return '7';
		case 60:
			return '8';
		case 61:
			return '9';
		case 62:
			return '+';
		default:
			return '/';
	}
};
var truqu$elm_base64$Base64$Encode$toBase64 = function (_int) {
	return _Utils_ap(
		truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 18)),
		_Utils_ap(
			truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 12)),
			_Utils_ap(
				truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 6)),
				truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 0)))));
};
var truqu$elm_base64$Base64$Encode$add = F2(
	function (_char, _n0) {
		var res = _n0.a;
		var count = _n0.b;
		var acc = _n0.c;
		var current = (acc << 8) | _char;
		if (count === 2) {
			return _Utils_Tuple3(
				_Utils_ap(
					res,
					truqu$elm_base64$Base64$Encode$toBase64(current)),
				0,
				0);
		} else {
			return _Utils_Tuple3(res, count + 1, current);
		}
	});
var truqu$elm_base64$Base64$Encode$chomp = F2(
	function (char_, acc) {
		var _char = elm$core$Char$toCode(char_);
		return (_char < 128) ? A2(truqu$elm_base64$Base64$Encode$add, _char, acc) : ((_char < 2048) ? A2(
			truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(truqu$elm_base64$Base64$Encode$add, 192 | (_char >>> 6), acc)) : (((_char < 55296) || ((_char >= 57344) && (_char <= 65535))) ? A2(
			truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2(truqu$elm_base64$Base64$Encode$add, 224 | (_char >>> 12), acc))) : A2(
			truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2(
					truqu$elm_base64$Base64$Encode$add,
					128 | (63 & (_char >>> 12)),
					A2(truqu$elm_base64$Base64$Encode$add, 240 | (_char >>> 18), acc))))));
	});
var truqu$elm_base64$Base64$Encode$initial = _Utils_Tuple3('', 0, 0);
var truqu$elm_base64$Base64$Encode$wrapUp = function (_n0) {
	var res = _n0.a;
	var cnt = _n0.b;
	var acc = _n0.c;
	switch (cnt) {
		case 1:
			return res + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 2)) + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 4)) + '=='));
		case 2:
			return res + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 10)) + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 4)) + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 2)) + '=')));
		default:
			return res;
	}
};
var truqu$elm_base64$Base64$Encode$encode = function (input) {
	return truqu$elm_base64$Base64$Encode$wrapUp(
		A3(elm$core$String$foldl, truqu$elm_base64$Base64$Encode$chomp, truqu$elm_base64$Base64$Encode$initial, input));
};
var truqu$elm_base64$Base64$encode = truqu$elm_base64$Base64$Encode$encode;
var author$project$Main$buildAuthorizationToken = F2(
	function (username, password) {
		return truqu$elm_base64$Base64$encode(username + (':' + password));
	});
var elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Header;
var author$project$Main$buildAuthorizationHeader = F2(
	function (username, password) {
		return A2(
			elm$http$Http$header,
			'Authorization',
			'Basic ' + A2(author$project$Main$buildAuthorizationToken, username, password));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$NetworkError = {$: 2};
var elm$http$Http$Timeout = {$: 1};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === -1) {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === -1) {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 2};
var elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$Timeout_ = {$: 1};
var elm$http$Http$stringResolver = A2(_Http_expect, '', elm$core$Basics$identity);
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var author$project$Main$jsonResolver = function (decoder) {
	return elm$http$Http$stringResolver(
		function (response) {
			switch (response.$) {
				case 0:
					var url = response.a;
					return elm$core$Result$Err(
						elm$http$Http$BadUrl(url));
				case 1:
					return elm$core$Result$Err(elm$http$Http$Timeout);
				case 2:
					return elm$core$Result$Err(elm$http$Http$NetworkError);
				case 3:
					var metadata = response.a;
					var body = response.b;
					return elm$core$Result$Err(
						elm$http$Http$BadStatus(metadata.er));
				default:
					var metadata = response.a;
					var body = response.b;
					var _n1 = A2(elm$json$Json$Decode$decodeString, decoder, body);
					if (!_n1.$) {
						var value = _n1.a;
						return elm$core$Result$Ok(value);
					} else {
						var err = _n1.a;
						return elm$core$Result$Err(
							elm$http$Http$BadBody(
								elm$json$Json$Decode$errorToString(err)));
					}
			}
		});
};
var author$project$Main$InstanceData = F2(
	function (instance, moment) {
		return {Y: instance, eb: moment};
	});
var author$project$Main$ResponseElem = F3(
	function (cellName, paramName, data) {
		return {dS: cellName, cq: data, ei: paramName};
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Main$responseDecoder = elm$json$Json$Decode$list(
	A4(
		elm$json$Json$Decode$map3,
		author$project$Main$ResponseElem,
		A2(elm$json$Json$Decode$field, 'cell_name', elm$json$Json$Decode$string),
		A2(elm$json$Json$Decode$field, 'param_name', elm$json$Json$Decode$string),
		A2(
			elm$json$Json$Decode$field,
			'data',
			elm$json$Json$Decode$list(
				A3(
					elm$json$Json$Decode$map2,
					author$project$Main$InstanceData,
					A2(elm$json$Json$Decode$field, 'instance', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'moment', elm$json$Json$Decode$string))))));
var elm$http$Http$emptyBody = _Http_emptyBody;
var elm$core$Task$fail = _Scheduler_fail;
var elm$http$Http$resultToTask = function (result) {
	if (!result.$) {
		var a = result.a;
		return elm$core$Task$succeed(a);
	} else {
		var x = result.a;
		return elm$core$Task$fail(x);
	}
};
var elm$http$Http$task = function (r) {
	return A3(
		_Http_toTask,
		0,
		elm$http$Http$resultToTask,
		{an: false, dR: r.dR, v: r.el, d1: r.d1, ea: r.ea, ce: r.ce, C: elm$core$Maybe$Nothing, eA: r.eA});
};
var author$project$Main$getTestServerResponse = elm$http$Http$task(
	{
		dR: elm$http$Http$emptyBody,
		d1: _List_fromArray(
			[
				A2(author$project$Main$buildAuthorizationHeader, 'koshizukaLab', '8TxgS73KmG')
			]),
		ea: 'GET',
		el: author$project$Main$jsonResolver(author$project$Main$responseDecoder),
		ce: elm$core$Maybe$Nothing,
		eA: 'http://172.26.16.8/api/ducrbcontrol/light/a304/'
	});
var author$project$Main$httpErrorToString = function (err) {
	switch (err.$) {
		case 0:
			return 'BadUrl';
		case 1:
			return 'Timeout';
		case 2:
			return 'NetworkError';
		case 3:
			return 'BadStatus';
		default:
			var s = err.a;
			return 'BadBody: ' + s;
	}
};
var elm$core$Basics$not = _Basics_not;
var author$project$Main$updateTABState = F2(
	function (msg, model) {
		if (!msg) {
			return _Utils_update(
				model,
				{a6: !model.a6});
		} else {
			return model;
		}
	});
var author$project$Internal$Ripple$Model$Idle = {$: 0};
var author$project$Internal$Ripple$Model$defaultModel = {ap: 0, x: author$project$Internal$Ripple$Model$Idle, bZ: elm$core$Maybe$Nothing, bx: false};
var author$project$Internal$Button$Model$defaultModel = {R: author$project$Internal$Ripple$Model$defaultModel};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Internal$Component$indexed = F3(
	function (get_model, set_model, model0) {
		var set_ = F3(
			function (idx, store, model) {
				return A2(
					set_model,
					A3(
						elm$core$Dict$insert,
						idx,
						model,
						get_model(store)),
					store);
			});
		var get_ = F2(
			function (idx, store) {
				return A2(
					elm$core$Maybe$withDefault,
					model0,
					A2(
						elm$core$Dict$get,
						idx,
						get_model(store)));
			});
		return {cH: get_, eq: set_};
	});
var author$project$Internal$Button$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.ck;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{ck: x});
		}),
	author$project$Internal$Button$Model$defaultModel);
var author$project$Internal$Button$Model$RippleMsg = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Process$sleep = _Process_sleep;
var author$project$Internal$Helpers$delayedCmd = F2(
	function (time, msg) {
		return A2(
			elm$core$Task$perform,
			elm$core$Basics$always(msg),
			elm$core$Process$sleep(time));
	});
var author$project$Internal$Ripple$Implementation$normalizedEventCoords = F3(
	function (event, pageOffset, clientRect) {
		var _n0 = pageOffset;
		var x = _n0.U;
		var y = _n0.V;
		var documentX = x + clientRect.U;
		var documentY = x + clientRect.V;
		var _n1 = event.eh;
		var pageX = _n1.c2;
		var pageY = _n1.c3;
		return {U: pageX - documentX, V: pageY - documentY};
	});
var author$project$Internal$Ripple$Implementation$fgTranslationCoords = F2(
	function (isUnbounded, _n0) {
		var frame = _n0.N;
		var activationEvent = _n0.am;
		var windowPageOffset = _n0.dM;
		var wasActivatedByPointer = _n0.dJ;
		var maxDimension = A2(elm$core$Basics$max, frame.dL, frame.c);
		var initialSize = maxDimension * 0.6;
		var startPoint = function () {
			var _n1 = A3(author$project$Internal$Ripple$Implementation$normalizedEventCoords, activationEvent, windowPageOffset, frame);
			var x = _n1.U;
			var y = _n1.V;
			return {U: x - (initialSize / 2), V: y - (initialSize / 2)};
		}();
		var endPoint = {U: (frame.dL - initialSize) / 2, V: (frame.c - initialSize) / 2};
		return {cx: endPoint, dq: startPoint};
	});
var elm$core$String$fromFloat = _String_fromNumber;
var author$project$Internal$Ripple$Implementation$animateActivation = F4(
	function (isUnbounded, frame, windowPageOffset, activationEvent) {
		var wasActivatedByPointer = true;
		var _n0 = A2(
			author$project$Internal$Ripple$Implementation$fgTranslationCoords,
			isUnbounded,
			{am: activationEvent, N: frame, dJ: wasActivatedByPointer, dM: windowPageOffset});
		var startPoint = _n0.dq;
		var endPoint = _n0.cx;
		var translateEnd = isUnbounded ? '' : (elm$core$String$fromFloat(endPoint.U) + ('px, ' + (elm$core$String$fromFloat(endPoint.V) + 'px')));
		var translateStart = isUnbounded ? '' : (elm$core$String$fromFloat(startPoint.U) + ('px, ' + (elm$core$String$fromFloat(startPoint.V) + 'px')));
		return {S: translateEnd, T: translateStart};
	});
var author$project$Internal$Ripple$Model$numbers = {dU: 225, d_: 150, d5: 0.6, eg: 10, dy: 300};
var elm$core$Basics$pow = _Basics_pow;
var elm$core$Basics$sqrt = _Basics_sqrt;
var author$project$Internal$Ripple$Implementation$layoutInternal = F2(
	function (isUnbounded, frame) {
		var maxDim = A2(elm$core$Basics$max, frame.dL, frame.c);
		var initialSize = elm$core$Basics$floor(maxDim * author$project$Internal$Ripple$Model$numbers.d5);
		var hypotenuse = elm$core$Basics$sqrt(
			A2(elm$core$Basics$pow, frame.dL, 2) + A2(elm$core$Basics$pow, frame.c, 2));
		var boundedRadius = hypotenuse + author$project$Internal$Ripple$Model$numbers.eg;
		var maxRadius = isUnbounded ? maxDim : boundedRadius;
		var fgScale = maxRadius / initialSize;
		return {G: fgScale, H: initialSize};
	});
var author$project$Internal$Ripple$Model$Activate = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var author$project$Internal$Ripple$Model$Activated = function (a) {
	return {$: 1, a: a};
};
var author$project$Internal$Ripple$Model$ActivationEnded = function (a) {
	return {$: 5, a: a};
};
var author$project$Internal$Ripple$Model$Deactivated = function (a) {
	return {$: 2, a: a};
};
var author$project$Internal$Ripple$Model$DeactivationEnded = function (a) {
	return {$: 7, a: a};
};
var author$project$Internal$Ripple$Model$Reactivate = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var elm$browser$Browser$Dom$getElement = _Browser_getElement;
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			A2(
				elm$core$Task$onError,
				A2(
					elm$core$Basics$composeL,
					A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
					elm$core$Result$Err),
				A2(
					elm$core$Task$andThen,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Ok),
					task)));
	});
var author$project$Internal$Ripple$Implementation$update = F2(
	function (msg, model) {
		var _n0 = _Utils_Tuple2(msg, model.x);
		_n0$11:
		while (true) {
			switch (_n0.a.$) {
				case 0:
					var _n1 = _n0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bx: true}),
						elm$core$Platform$Cmd$none);
				case 1:
					var _n2 = _n0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bx: false}),
						elm$core$Platform$Cmd$none);
				case 8:
					var _n3 = _n0.a;
					var isUnbounded = _n3.a;
					var clientRect = _n3.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bZ: elm$core$Maybe$Just(clientRect)
							}),
						elm$core$Platform$Cmd$none);
				case 2:
					if (!_n0.b.$) {
						var _n4 = _n0.a;
						var domId = _n4.a;
						var activateData = _n4.b;
						var _n5 = _n0.b;
						return _Utils_Tuple2(
							model,
							A2(
								elm$core$Task$attempt,
								author$project$Internal$Ripple$Model$Activate(activateData),
								elm$browser$Browser$Dom$getElement(domId)));
					} else {
						var _n6 = _n0.a;
						var domId = _n6.a;
						var activateData = _n6.b;
						return _Utils_Tuple2(
							model,
							A2(
								elm$core$Task$attempt,
								author$project$Internal$Ripple$Model$Reactivate(activateData),
								elm$browser$Browser$Dom$getElement(domId)));
					}
				case 4:
					var _n7 = _n0.a;
					var activateData = _n7.a;
					var element = _n7.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{x: author$project$Internal$Ripple$Model$Idle}),
						A2(
							elm$core$Task$perform,
							function (_n8) {
								return A2(author$project$Internal$Ripple$Model$Activate, activateData, element);
							},
							elm$core$Task$succeed(0)));
				case 3:
					if (_n0.a.b.$ === 1) {
						var _n9 = _n0.a;
						var activateData = _n9.a;
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var _n10 = _n0.a;
						var activateData = _n10.a;
						var element = _n10.b.a.dV;
						var viewport = _n10.b.a.dI;
						var newAnimationCounter = model.ap + 1;
						var _n11 = A4(author$project$Internal$Ripple$Implementation$animateActivation, activateData.aV, element, viewport, activateData.b2);
						var translateStart = _n11.T;
						var translateEnd = _n11.S;
						var _n12 = A2(author$project$Internal$Ripple$Implementation$layoutInternal, activateData.aV, element);
						var fgScale = _n12.G;
						var initialSize = _n12.H;
						var activatedData = {
							am: elm$core$Maybe$Just(activateData.b2),
							bY: false,
							bp: false,
							G: fgScale,
							N: {c: element.c, m: element.U, f: element.V, dL: element.dL},
							H: initialSize,
							S: translateEnd,
							T: translateStart,
							ch: activateData.ch
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ap: newAnimationCounter,
									x: author$project$Internal$Ripple$Model$Activated(activatedData)
								}),
							A2(
								elm$core$Task$perform,
								function (_n13) {
									return author$project$Internal$Ripple$Model$ActivationEnded(newAnimationCounter);
								},
								elm$core$Process$sleep(author$project$Internal$Ripple$Model$numbers.dU)));
					}
				case 5:
					if (_n0.b.$ === 1) {
						var animationCount = _n0.a.a;
						var activatedData = _n0.b.a;
						if (_Utils_eq(animationCount, model.ap)) {
							if (activatedData.bp) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											x: author$project$Internal$Ripple$Model$Deactivated(activatedData)
										}),
									A2(
										elm$core$Task$perform,
										function (_n14) {
											return author$project$Internal$Ripple$Model$DeactivationEnded(model.ap);
										},
										elm$core$Process$sleep(author$project$Internal$Ripple$Model$numbers.dy)));
							} else {
								var newActivatedData = _Utils_update(
									activatedData,
									{bY: true});
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											x: author$project$Internal$Ripple$Model$Activated(newActivatedData)
										}),
									elm$core$Platform$Cmd$none);
							}
						} else {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					} else {
						break _n0$11;
					}
				case 6:
					if (_n0.b.$ === 1) {
						var _n15 = _n0.a;
						var activatedData = _n0.b.a;
						if (activatedData.bY) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										x: author$project$Internal$Ripple$Model$Deactivated(activatedData)
									}),
								A2(
									elm$core$Task$perform,
									function (_n16) {
										return author$project$Internal$Ripple$Model$DeactivationEnded(model.ap);
									},
									elm$core$Process$sleep(author$project$Internal$Ripple$Model$numbers.dy)));
						} else {
							var newActivatedData = _Utils_update(
								activatedData,
								{am: elm$core$Maybe$Nothing, bp: true});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										x: author$project$Internal$Ripple$Model$Activated(newActivatedData)
									}),
								elm$core$Platform$Cmd$none);
						}
					} else {
						break _n0$11;
					}
				default:
					if (_n0.b.$ === 2) {
						var animationCount = _n0.a.a;
						return _Utils_eq(animationCount, model.ap) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{x: author$project$Internal$Ripple$Model$Idle}),
							elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						break _n0$11;
					}
			}
		}
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Internal$Button$Implementation$update = F3(
	function (lift, msg, model) {
		if (!msg.$) {
			var msg_ = msg.a;
			var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
			var rippleState = _n1.a;
			var rippleCmd = _n1.b;
			return _Utils_Tuple2(
				elm$core$Maybe$Just(
					_Utils_update(
						model,
						{R: rippleState})),
				A2(
					elm$core$Platform$Cmd$map,
					A2(elm$core$Basics$composeL, lift, author$project$Internal$Button$Model$RippleMsg),
					rippleCmd));
		} else {
			var doRipple = msg.a;
			var msg_ = msg.b;
			return _Utils_Tuple2(
				elm$core$Maybe$Nothing,
				A2(
					author$project$Internal$Helpers$delayedCmd,
					doRipple ? 150 : 0,
					msg_));
		}
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var author$project$Internal$Component$react = F8(
	function (get, set, ctor, update, lift, msg, idx, store) {
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Maybe$map(
				A2(set, idx, store)),
			A3(
				update,
				A2(
					elm$core$Basics$composeL,
					lift,
					ctor(idx)),
				msg,
				A2(get, idx, store)));
	});
var author$project$Internal$Msg$ButtonMsg = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Internal$Button$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Button$Implementation$getSet.cH, author$project$Internal$Button$Implementation$getSet.eq, author$project$Internal$Msg$ButtonMsg, author$project$Internal$Button$Implementation$update);
var author$project$Internal$Checkbox$Model$defaultModel = {bk: elm$core$Maybe$Nothing, d7: false, bC: elm$core$Maybe$Nothing};
var author$project$Internal$Checkbox$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.cn;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{cn: x});
		}),
	author$project$Internal$Checkbox$Model$defaultModel);
var author$project$Internal$Checkbox$Model$CheckedIndeterminate = 3;
var author$project$Internal$Checkbox$Model$CheckedUnchecked = 2;
var author$project$Internal$Checkbox$Model$IndeterminateChecked = 4;
var author$project$Internal$Checkbox$Model$IndeterminateUnchecked = 5;
var author$project$Internal$Checkbox$Model$UncheckedChecked = 0;
var author$project$Internal$Checkbox$Model$UncheckedIndeterminate = 1;
var author$project$Internal$Checkbox$Implementation$animationState = F2(
	function (oldState, state) {
		var _n0 = _Utils_Tuple2(oldState, state);
		_n0$6:
		while (true) {
			if (_n0.a.$ === 1) {
				if (!_n0.b.$) {
					if (!_n0.b.a) {
						var _n5 = _n0.a;
						var _n6 = _n0.b.a;
						return elm$core$Maybe$Just(4);
					} else {
						var _n7 = _n0.a;
						var _n8 = _n0.b.a;
						return elm$core$Maybe$Just(5);
					}
				} else {
					break _n0$6;
				}
			} else {
				if (_n0.a.a === 1) {
					if (_n0.b.$ === 1) {
						var _n1 = _n0.a.a;
						var _n2 = _n0.b;
						return elm$core$Maybe$Just(1);
					} else {
						if (!_n0.b.a) {
							var _n9 = _n0.a.a;
							var _n10 = _n0.b.a;
							return elm$core$Maybe$Just(0);
						} else {
							break _n0$6;
						}
					}
				} else {
					if (_n0.b.$ === 1) {
						var _n3 = _n0.a.a;
						var _n4 = _n0.b;
						return elm$core$Maybe$Just(3);
					} else {
						if (_n0.b.a === 1) {
							var _n11 = _n0.a.a;
							var _n12 = _n0.b.a;
							return elm$core$Maybe$Just(2);
						} else {
							break _n0$6;
						}
					}
				}
			}
		}
		return elm$core$Maybe$Nothing;
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Internal$Checkbox$Implementation$update = F3(
	function (_n0, msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 2:
				var focus = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{d7: focus})),
					elm$core$Platform$Cmd$none);
			case 1:
				var lastKnownState = msg.a;
				var state = msg.b;
				var animation = A2(
					elm$core$Maybe$andThen,
					function (lastKnownState_) {
						return A2(author$project$Internal$Checkbox$Implementation$animationState, lastKnownState_, state);
					},
					lastKnownState);
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								bk: animation,
								bC: elm$core$Maybe$Just(state)
							})),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bk: elm$core$Maybe$Nothing})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$CheckboxMsg = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Internal$Checkbox$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Checkbox$Implementation$getSet.cH, author$project$Internal$Checkbox$Implementation$getSet.eq, author$project$Internal$Msg$CheckboxMsg, author$project$Internal$Checkbox$Implementation$update);
var author$project$Internal$Chip$Model$defaultModel = {R: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Chip$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.co;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{co: x});
		}),
	author$project$Internal$Chip$Model$defaultModel);
var author$project$Internal$Chip$Model$RippleMsg = function (a) {
	return {$: 0, a: a};
};
var author$project$Internal$Chip$Implementation$update = F3(
	function (lift, msg, model) {
		if (!msg.$) {
			var msg_ = msg.a;
			var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
			var ripple = _n1.a;
			var cmd = _n1.b;
			return _Utils_Tuple2(
				elm$core$Maybe$Just(
					_Utils_update(
						model,
						{R: ripple})),
				A2(
					elm$core$Platform$Cmd$map,
					A2(elm$core$Basics$composeL, lift, author$project$Internal$Chip$Model$RippleMsg),
					cmd));
		} else {
			var msg_ = msg.a;
			return _Utils_Tuple2(
				elm$core$Maybe$Nothing,
				A2(author$project$Internal$Helpers$delayedCmd, 150, msg_));
		}
	});
var author$project$Internal$Msg$ChipMsg = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var author$project$Internal$Chip$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Chip$Implementation$getSet.cH, author$project$Internal$Chip$Implementation$getSet.eq, author$project$Internal$Msg$ChipMsg, author$project$Internal$Chip$Implementation$update);
var author$project$Internal$Dialog$Model$defaultModel = {aK: false, l: false};
var author$project$Internal$Dialog$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.ct;
	},
	F2(
		function (x, c) {
			return _Utils_update(
				c,
				{ct: x});
		}),
	author$project$Internal$Dialog$Model$defaultModel);
var author$project$Internal$Dialog$Implementation$update = F3(
	function (_n0, msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 1:
				var isOpen = msg.a;
				return (!_Utils_eq(isOpen, model.l)) ? _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{aK: true, l: isOpen})),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{aK: false})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$DialogMsg = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var author$project$Internal$Dialog$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Dialog$Implementation$getSet.cH, author$project$Internal$Dialog$Implementation$getSet.eq, author$project$Internal$Msg$DialogMsg, author$project$Internal$Dialog$Implementation$update);
var author$project$Internal$Dispatch$forward = function (msgs) {
	return elm$core$Platform$Cmd$batch(
		A2(
			elm$core$List$map,
			A2(
				elm$core$Basics$composeL,
				elm$core$Task$perform(elm$core$Basics$identity),
				elm$core$Task$succeed),
			msgs));
};
var author$project$Internal$Drawer$Model$defaultModel = {aK: false, bm: false, l: false};
var author$project$Internal$Drawer$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.b1;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{b1: x});
		}),
	author$project$Internal$Drawer$Model$defaultModel);
var author$project$Internal$Drawer$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 1:
				var isOpen = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{aK: true, bm: !isOpen, l: true})),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								aK: false,
								bm: false,
								l: model.bm ? false : model.l
							})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Drawer$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Drawer$Implementation$getSet.cH, author$project$Internal$Drawer$Implementation$getSet.eq, author$project$Internal$Msg$DrawerMsg, author$project$Internal$Drawer$Implementation$update);
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var author$project$Internal$Component$generalise = F4(
	function (update, lift, msg, model) {
		return A2(
			elm$core$Tuple$mapSecond,
			elm$core$Platform$Cmd$map(lift),
			A2(
				elm$core$Tuple$mapFirst,
				elm$core$Maybe$Just,
				A2(update, msg, model)));
	});
var author$project$Internal$Fab$Model$defaultModel = {R: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Fab$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.cy;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{cy: x});
		}),
	author$project$Internal$Fab$Model$defaultModel);
var author$project$Internal$Fab$Model$RippleMsg = function (a) {
	return {$: 0, a: a};
};
var author$project$Internal$Fab$Implementation$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var msg_ = msg.a;
			var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
			var rippleState = _n1.a;
			var rippleCmd = _n1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{R: rippleState}),
				A2(elm$core$Platform$Cmd$map, author$project$Internal$Fab$Model$RippleMsg, rippleCmd));
		} else {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$FabMsg = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var author$project$Internal$Fab$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Fab$Implementation$getSet.cH,
	author$project$Internal$Fab$Implementation$getSet.eq,
	author$project$Internal$Msg$FabMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Fab$Implementation$update));
var author$project$Internal$IconButton$Model$defaultModel = {h: false, R: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$IconButton$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.cL;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{cL: x});
		}),
	author$project$Internal$IconButton$Model$defaultModel);
var author$project$Internal$IconButton$Model$RippleMsg = elm$core$Basics$identity;
var author$project$Internal$IconButton$Implementation$update = F2(
	function (msg, model) {
		var msg_ = msg;
		var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
		var ripple = _n1.a;
		var effects = _n1.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{R: ripple}),
			A2(elm$core$Platform$Cmd$map, elm$core$Basics$identity, effects));
	});
var author$project$Internal$Msg$IconButtonMsg = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var author$project$Internal$IconButton$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$IconButton$Implementation$getSet.cH,
	author$project$Internal$IconButton$Implementation$getSet.eq,
	author$project$Internal$Msg$IconButtonMsg,
	author$project$Internal$Component$generalise(author$project$Internal$IconButton$Implementation$update));
var author$project$Internal$List$Model$defaultModel = {bx: elm$core$Maybe$Nothing, a4: elm$core$Dict$empty};
var author$project$Internal$List$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.cU;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{cU: x});
		}),
	author$project$Internal$List$Model$defaultModel);
var author$project$Internal$List$Implementation$send = function (msg) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$identity,
		elm$core$Task$succeed(msg));
};
var author$project$Internal$List$Model$NoOp = {$: 0};
var author$project$Internal$List$Model$RippleMsg = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$browser$Browser$Dom$focus = _Browser_call('focus');
var author$project$Internal$List$Implementation$update = F3(
	function (lift, msg, model) {
		var isRtl = false;
		switch (msg.$) {
			case 1:
				var index = msg.a;
				var msg_ = msg.b;
				var _n1 = A2(
					author$project$Internal$Ripple$Implementation$update,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Ripple$Model$defaultModel,
						A2(elm$core$Dict$get, index, model.a4)));
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								a4: A3(elm$core$Dict$insert, index, ripple, model.a4)
							})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(
							elm$core$Basics$composeL,
							lift,
							author$project$Internal$List$Model$RippleMsg(index)),
						effects));
			case 3:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bx: elm$core$Maybe$Nothing})),
					elm$core$Platform$Cmd$none);
			case 2:
				var index = msg.a;
				var id = msg.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bx: elm$core$Maybe$Nothing})),
					A2(
						elm$core$Task$attempt,
						function (_n2) {
							return lift(author$project$Internal$List$Model$NoOp);
						},
						elm$browser$Browser$Dom$focus(id)));
			case 4:
				var index = msg.a;
				var m = msg.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bx: elm$core$Maybe$Nothing})),
					author$project$Internal$List$Implementation$send(
						m(index)));
			default:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$ListMsg = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var author$project$Internal$List$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$List$Implementation$getSet.cH, author$project$Internal$List$Implementation$getSet.eq, author$project$Internal$Msg$ListMsg, author$project$Internal$List$Implementation$update);
var author$project$Internal$Menu$Model$defaultModel = {aK: false, M: elm$core$Maybe$Nothing, av: elm$core$Maybe$Nothing, aw: elm$core$Maybe$Nothing, bA: false, l: false, A: elm$core$Maybe$Nothing};
var author$project$Internal$Menu$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.o;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{o: x});
		}),
	author$project$Internal$Menu$Model$defaultModel);
var author$project$Internal$Helpers$cmd = function (msg) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$identity,
		elm$core$Task$succeed(msg));
};
var author$project$Internal$Menu$Model$AnimationEnd = {$: 2};
var author$project$Internal$Menu$Model$Close = {$: 4};
var author$project$Internal$Menu$Model$Open = {$: 3};
var author$project$Internal$Menu$Implementation$update = F3(
	function (lift, msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 0:
					return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 5:
					var $temp$lift = lift,
						$temp$msg = model.l ? author$project$Internal$Menu$Model$Close : author$project$Internal$Menu$Model$Open,
						$temp$model = model;
					lift = $temp$lift;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 3:
					var doQuickOpen = A2(elm$core$Maybe$withDefault, false, model.A);
					return (!model.l) ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{aK: true, av: elm$core$Maybe$Nothing, l: true})),
						(!doQuickOpen) ? A2(
							author$project$Internal$Helpers$delayedCmd,
							120,
							lift(author$project$Internal$Menu$Model$AnimationEnd)) : author$project$Internal$Helpers$cmd(
							lift(author$project$Internal$Menu$Model$AnimationEnd))) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 4:
					var doQuickOpen = A2(elm$core$Maybe$withDefault, false, model.A);
					return model.l ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{aK: true, M: elm$core$Maybe$Nothing, l: false, A: elm$core$Maybe$Nothing})),
						(!doQuickOpen) ? A2(
							author$project$Internal$Helpers$delayedCmd,
							70,
							lift(author$project$Internal$Menu$Model$AnimationEnd)) : author$project$Internal$Helpers$cmd(
							lift(author$project$Internal$Menu$Model$AnimationEnd))) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 6:
					return _Utils_Tuple2(
						elm$core$Maybe$Nothing,
						A2(
							author$project$Internal$Helpers$delayedCmd,
							50,
							lift(author$project$Internal$Menu$Model$Close)));
				case 1:
					var config = msg.a;
					var geometry = msg.b;
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									M: config.aw,
									av: elm$core$Maybe$Just(geometry),
									A: elm$core$Maybe$Just(config.A)
								})),
						elm$core$Platform$Cmd$none);
				case 2:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{aK: false})),
						elm$core$Platform$Cmd$none);
				case 7:
					var $temp$lift = lift,
						$temp$msg = author$project$Internal$Menu$Model$Close,
						$temp$model = model;
					lift = $temp$lift;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 8:
					var numItems = msg.a;
					var shiftKey = msg.b.bO;
					var altKey = msg.b.bj;
					var ctrlKey = msg.b.bo;
					var metaKey = msg.b.bE;
					var key = msg.c;
					var keyCode = msg.d;
					var lastItemIndex = numItems - 1;
					var isTab = (key === 'Tab') || (keyCode === 9);
					var isSpace = (key === 'Space') || (keyCode === 32);
					var isEnter = (key === 'Enter') || (keyCode === 13);
					var keyDownWithinMenu = isEnter || isSpace;
					var isArrowUp = (key === 'ArrowUp') || (keyCode === 38);
					var isArrowDown = (key === 'ArrowDown') || (keyCode === 40);
					var focusedItemIndex = A2(elm$core$Maybe$withDefault, 0, model.M);
					return A2(
						elm$core$Tuple$mapFirst,
						elm$core$Maybe$map(
							function (updatedModel) {
								return _Utils_update(
									updatedModel,
									{bA: keyDownWithinMenu});
							}),
						(altKey || (ctrlKey || metaKey)) ? _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none) : (isArrowUp ? _Utils_Tuple2(
							elm$core$Maybe$Just(
								(!focusedItemIndex) ? _Utils_update(
									model,
									{
										M: elm$core$Maybe$Just(lastItemIndex)
									}) : _Utils_update(
									model,
									{
										M: elm$core$Maybe$Just(focusedItemIndex - 1)
									})),
							elm$core$Platform$Cmd$none) : (isArrowDown ? _Utils_Tuple2(
							elm$core$Maybe$Just(
								_Utils_eq(focusedItemIndex, lastItemIndex) ? _Utils_update(
									model,
									{
										M: elm$core$Maybe$Just(0)
									}) : _Utils_update(
									model,
									{
										M: elm$core$Maybe$Just(focusedItemIndex + 1)
									})),
							elm$core$Platform$Cmd$none) : ((isSpace || isEnter) ? _Utils_Tuple2(
							elm$core$Maybe$Just(model),
							elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none)))));
				case 9:
					var shiftKey = msg.a.bO;
					var altKey = msg.a.bj;
					var ctrlKey = msg.a.bo;
					var metaKey = msg.a.bE;
					var key = msg.b;
					var keyCode = msg.c;
					var isSpace = (key === 'Space') || (keyCode === 32);
					var isEscape = (key === 'Escape') || (keyCode === 27);
					var isEnter = (key === 'Enter') || (keyCode === 13);
					return A2(
						elm$core$Tuple$mapFirst,
						elm$core$Maybe$map(
							function (updatedModel) {
								return ((isEnter || isSpace) && updatedModel.bA) ? _Utils_update(
									updatedModel,
									{bA: false}) : updatedModel;
							}),
						(altKey || (ctrlKey || metaKey)) ? _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none) : ((isEscape || ((isSpace || isEnter) && model.bA)) ? A3(author$project$Internal$Menu$Implementation$update, lift, author$project$Internal$Menu$Model$Close, model) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none)));
				default:
					var focusedItemAtIndex = msg.a;
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									M: elm$core$Maybe$Just(focusedItemAtIndex)
								})),
						elm$core$Platform$Cmd$none);
			}
		}
	});
var author$project$Internal$Menu$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Menu$Implementation$getSet.cH, author$project$Internal$Menu$Implementation$getSet.eq, author$project$Internal$Msg$MenuMsg, author$project$Internal$Menu$Implementation$update);
var author$project$Internal$Msg$RadioButtonMsg = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var author$project$Internal$RadioButton$Model$defaultModel = {d7: false, R: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$RadioButton$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.df;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{df: x});
		}),
	author$project$Internal$RadioButton$Model$defaultModel);
var author$project$Internal$RadioButton$Model$RippleMsg = function (a) {
	return {$: 0, a: a};
};
var author$project$Internal$RadioButton$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 0:
				var msg_ = msg.a;
				var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{R: ripple})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(elm$core$Basics$composeL, lift, author$project$Internal$RadioButton$Model$RippleMsg),
						effects));
			case 1:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			default:
				var focus = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{d7: focus})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$RadioButton$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$RadioButton$Implementation$getSet.cH, author$project$Internal$RadioButton$Implementation$getSet.eq, author$project$Internal$Msg$RadioButtonMsg, author$project$Internal$RadioButton$Implementation$update);
var author$project$Internal$Msg$RippleMsg = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var author$project$Internal$Ripple$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.R;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{R: x});
		}),
	author$project$Internal$Ripple$Model$defaultModel);
var author$project$Internal$Ripple$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Ripple$Implementation$getSet.cH,
	author$project$Internal$Ripple$Implementation$getSet.eq,
	author$project$Internal$Msg$RippleMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Ripple$Implementation$update));
var author$project$Internal$Msg$SelectMsg = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var author$project$Internal$Select$Model$defaultModel = {bx: false, cO: false, R: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Select$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.$7;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{$7: x});
		}),
	author$project$Internal$Select$Model$defaultModel);
var author$project$Internal$Select$Model$RippleMsg = function (a) {
	return {$: 3, a: a};
};
var author$project$Internal$Select$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 2:
				var changedValue = msg.a;
				var dirty = changedValue !== '';
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{cO: dirty})),
					elm$core$Platform$Cmd$none);
			case 0:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bx: false})),
					elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bx: true})),
					elm$core$Platform$Cmd$none);
			default:
				var msg_ = msg.a;
				var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{R: ripple})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(elm$core$Basics$composeL, lift, author$project$Internal$Select$Model$RippleMsg),
						effects));
		}
	});
var author$project$Internal$Select$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Select$Implementation$getSet.cH, author$project$Internal$Select$Implementation$getSet.eq, author$project$Internal$Msg$SelectMsg, author$project$Internal$Select$Implementation$update);
var author$project$Internal$Msg$SliderMsg = F2(
	function (a, b) {
		return {$: 13, a: a, b: b};
	});
var author$project$Internal$Slider$Model$defaultModel = {D: false, aI: elm$core$Maybe$Nothing, bv: false, av: elm$core$Maybe$Nothing, aT: false, bK: false};
var author$project$Internal$Slider$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.dp;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{dp: x});
		}),
	author$project$Internal$Slider$Model$defaultModel);
var author$project$Internal$Slider$Implementation$valueFromPageX = F2(
	function (geometry, pageX) {
		var xPos = pageX - geometry.a3.m;
		var isRtl = false;
		var pctComplete = isRtl ? (1 - (xPos / geometry.a3.dL)) : (xPos / geometry.a3.dL);
		return geometry.d + (pctComplete * (geometry.k - geometry.d));
	});
var author$project$Internal$Slider$Model$ActualUp = {$: 11};
var author$project$Internal$Slider$Model$Init = function (a) {
	return {$: 1, a: a};
};
var author$project$Internal$Slider$Model$defaultGeometry = {
	L: false,
	k: 100,
	d: 0,
	a3: {m: 0, dL: 0},
	J: elm$core$Maybe$Nothing
};
var author$project$Internal$Slider$Implementation$update = F3(
	function (lift, msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 0:
					return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 5:
					return (!model.bK) ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{bv: true})),
						elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 6:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{bv: false, bK: false})),
						elm$core$Platform$Cmd$none);
				case 8:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{aT: false})),
						elm$core$Platform$Cmd$none);
				case 3:
					var pageX = msg.b.c2;
					var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$Slider$Model$defaultGeometry, model.av);
					var activeValue = A2(author$project$Internal$Slider$Implementation$valueFromPageX, geometry, pageX);
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									D: true,
									aI: elm$core$Maybe$Just(activeValue),
									aT: true,
									bK: true
								})),
						elm$core$Platform$Cmd$none);
				case 7:
					var pageX = msg.b.c2;
					var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$Slider$Model$defaultGeometry, model.av);
					var activeValue = A2(author$project$Internal$Slider$Implementation$valueFromPageX, geometry, pageX);
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									D: true,
									aI: elm$core$Maybe$Just(activeValue),
									aT: false,
									bK: true
								})),
						elm$core$Platform$Cmd$none);
				case 9:
					var pageX = msg.a.c2;
					if (model.D) {
						var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$Slider$Model$defaultGeometry, model.av);
						var activeValue = A2(author$project$Internal$Slider$Implementation$valueFromPageX, geometry, pageX);
						return _Utils_Tuple2(
							elm$core$Maybe$Just(
								_Utils_update(
									model,
									{
										aI: elm$core$Maybe$Just(activeValue),
										aT: false
									})),
							elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
					}
				case 1:
					var geometry = msg.a;
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									av: elm$core$Maybe$Just(geometry)
								})),
						elm$core$Platform$Cmd$none);
				case 2:
					var geometry = msg.a;
					var $temp$lift = lift,
						$temp$msg = author$project$Internal$Slider$Model$Init(geometry),
						$temp$model = model;
					lift = $temp$lift;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 4:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{bv: true})),
						elm$core$Platform$Cmd$none);
				case 10:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(model),
						A2(
							elm$core$Task$perform,
							lift,
							elm$core$Task$succeed(author$project$Internal$Slider$Model$ActualUp)));
				default:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{D: false, aI: elm$core$Maybe$Nothing})),
						elm$core$Platform$Cmd$none);
			}
		}
	});
var author$project$Internal$Slider$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Slider$Implementation$getSet.cH, author$project$Internal$Slider$Implementation$getSet.eq, author$project$Internal$Msg$SliderMsg, author$project$Internal$Slider$Implementation$update);
var author$project$Internal$Msg$SnackbarMsg = F2(
	function (a, b) {
		return {$: 14, a: a, b: b};
	});
var author$project$Internal$Snackbar$Model$Inert = {$: 0};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Internal$Snackbar$Model$defaultModel = {l: false, bM: _List_Nil, aE: -1, bP: author$project$Internal$Snackbar$Model$Inert};
var author$project$Internal$Snackbar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.bb;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{bb: x});
		}),
	author$project$Internal$Snackbar$Model$defaultModel);
var author$project$Internal$Snackbar$Model$Move = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Internal$Snackbar$Implementation$next = function (model) {
	return elm$core$Platform$Cmd$map(
		author$project$Internal$Snackbar$Model$Move(model.aE));
};
var author$project$Internal$Snackbar$Model$Active = function (a) {
	return {$: 1, a: a};
};
var author$project$Internal$Snackbar$Model$Timeout = 0;
var author$project$Internal$Snackbar$Implementation$tryDequeue = function (model) {
	var _n0 = _Utils_Tuple2(model.bP, model.bM);
	if ((!_n0.a.$) && _n0.b.b) {
		var _n1 = _n0.a;
		var _n2 = _n0.b;
		var c = _n2.a;
		var cs = _n2.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					l: false,
					bM: cs,
					aE: model.aE + 1,
					bP: author$project$Internal$Snackbar$Model$Active(c)
				}),
			A2(
				elm$core$Platform$Cmd$map,
				author$project$Internal$Snackbar$Model$Move(model.aE + 1),
				A2(author$project$Internal$Helpers$delayedCmd, c.ce, 0)));
	} else {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	}
};
var author$project$Internal$Snackbar$Model$Fading = function (a) {
	return {$: 2, a: a};
};
var author$project$Internal$Snackbar$Implementation$move = F2(
	function (transition, model) {
		var _n0 = _Utils_Tuple2(model.bP, transition);
		if (_n0.b === 1) {
			if (_n0.a.$ === 1) {
				var contents = _n0.a.a;
				var _n3 = _n0.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bP: author$project$Internal$Snackbar$Model$Fading(contents)
						}),
					A2(
						author$project$Internal$Snackbar$Implementation$next,
						model,
						A2(author$project$Internal$Helpers$delayedCmd, contents.bs, 0)));
			} else {
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			}
		} else {
			switch (_n0.a.$) {
				case 0:
					var _n1 = _n0.a;
					var _n2 = _n0.b;
					return author$project$Internal$Snackbar$Implementation$tryDequeue(model);
				case 1:
					var contents = _n0.a.a;
					var _n4 = _n0.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bP: author$project$Internal$Snackbar$Model$Fading(contents)
							}),
						A2(
							author$project$Internal$Snackbar$Implementation$next,
							model,
							A2(author$project$Internal$Helpers$delayedCmd, contents.bs, 0)));
				default:
					var contents = _n0.a.a;
					var _n5 = _n0.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bP: author$project$Internal$Snackbar$Model$Inert}),
						A2(
							author$project$Internal$Snackbar$Implementation$next,
							model,
							author$project$Internal$Helpers$cmd(0)));
			}
		}
	});
var author$project$Internal$Snackbar$Model$Clicked = 1;
var author$project$Internal$Snackbar$Implementation$update = F3(
	function (fwd, msg, model) {
		switch (msg.$) {
			case 0:
				var seq = msg.a;
				var transition = msg.b;
				return _Utils_eq(seq, model.aE) ? A2(
					elm$core$Tuple$mapSecond,
					elm$core$Platform$Cmd$map(fwd),
					A2(author$project$Internal$Snackbar$Implementation$move, transition, model)) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 1:
				var dismissOnAction = msg.a;
				var actionOnDismiss = msg.b;
				var fwdEffect = function () {
					if (!actionOnDismiss.$) {
						var msg_ = actionOnDismiss.a;
						return author$project$Internal$Helpers$cmd(msg_);
					} else {
						return elm$core$Platform$Cmd$none;
					}
				}();
				return A2(
					elm$core$Tuple$mapSecond,
					function (cmd) {
						return elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[cmd, fwdEffect]));
					},
					dismissOnAction ? A3(
						author$project$Internal$Snackbar$Implementation$update,
						fwd,
						A2(author$project$Internal$Snackbar$Model$Move, model.aE, 1),
						model) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none));
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{l: true}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Snackbar$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Snackbar$Implementation$getSet.cH,
	author$project$Internal$Snackbar$Implementation$getSet.eq,
	author$project$Internal$Msg$SnackbarMsg,
	F3(
		function (fwd, msg, model) {
			return A2(
				elm$core$Tuple$mapFirst,
				elm$core$Maybe$Just,
				A3(author$project$Internal$Snackbar$Implementation$update, fwd, msg, model));
		}));
var author$project$Internal$Msg$SwitchMsg = F2(
	function (a, b) {
		return {$: 15, a: a, b: b};
	});
var author$project$Internal$Switch$Model$defaultModel = {d7: false, R: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Switch$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.du;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{du: x});
		}),
	author$project$Internal$Switch$Model$defaultModel);
var author$project$Internal$Switch$Model$RippleMsg = function (a) {
	return {$: 0, a: a};
};
var author$project$Internal$Switch$Implementation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var msg_ = msg.a;
				var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.R);
				var rippleState = _n1.a;
				var rippleCmd = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{R: rippleState}),
					A2(elm$core$Platform$Cmd$map, author$project$Internal$Switch$Model$RippleMsg, rippleCmd));
			case 1:
				var focus = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{d7: focus}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Switch$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Switch$Implementation$getSet.cH,
	author$project$Internal$Switch$Implementation$getSet.eq,
	author$project$Internal$Msg$SwitchMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Switch$Implementation$update));
var author$project$Internal$Msg$TabBarMsg = F2(
	function (a, b) {
		return {$: 16, a: a, b: b};
	});
var author$project$Internal$TabBar$Model$defaultModel = {n: 0, av: elm$core$Maybe$Nothing, a4: elm$core$Dict$empty, dH: 0};
var author$project$Internal$TabBar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.dw;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{dw: x});
		}),
	author$project$Internal$TabBar$Model$defaultModel);
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Internal$TabBar$Implementation$calculateScrollIncrement = F5(
	function (geometry, index, nextIndex, scrollPosition, barWidth) {
		var maybe_next_tab = elm$core$List$head(
			A2(elm$core$List$drop, nextIndex, geometry.bc));
		var extraScrollAmount = 20;
		if (!maybe_next_tab.$) {
			var next_tab = maybe_next_tab.a;
			var relativeContentRight = next_tab.b0 - scrollPosition;
			var relativeContentLeft = (next_tab.b$ - scrollPosition) - barWidth;
			var rightIncrement = relativeContentLeft + extraScrollAmount;
			var leftIncrement = relativeContentRight - extraScrollAmount;
			return (_Utils_cmp(nextIndex, index) < 0) ? A2(elm$core$Basics$min, leftIncrement, 0) : A2(elm$core$Basics$max, rightIncrement, 0);
		} else {
			return 0;
		}
	});
var author$project$Internal$TabBar$Implementation$findAdjacentTabIndexClosestToEdge = F4(
	function (index, tab_, scrollPosition, barWidth) {
		var rootRight = tab_.aj + tab_.w;
		var rootLeft = tab_.aj;
		var relativeRootRight = (rootRight - scrollPosition) - barWidth;
		var relativeRootLeft = rootLeft - scrollPosition;
		var relativeRootDelta = relativeRootLeft + relativeRootRight;
		var rightEdgeIsCloser = (relativeRootRight > 0) || (relativeRootDelta > 0);
		var leftEdgeIsCloser = (relativeRootLeft < 0) || (relativeRootDelta < 0);
		return leftEdgeIsCloser ? (index - 1) : (rightEdgeIsCloser ? (index + 1) : (-1));
	});
var author$project$Internal$TabBar$Model$NoOp = {$: 0};
var author$project$Internal$TabBar$Model$RippleMsg = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Internal$TabBar$Model$defaultGeometry = {
	dk: {w: 0},
	dv: {w: 0},
	bc: _List_Nil
};
var elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var author$project$Internal$TabBar$Implementation$update = F3(
	function (lift, msg, model) {
		var isRtl = false;
		switch (msg.$) {
			case 2:
				var index = msg.a;
				var msg_ = msg.b;
				var _n1 = A2(
					author$project$Internal$Ripple$Implementation$update,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Ripple$Model$defaultModel,
						A2(elm$core$Dict$get, index, model.a4)));
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								a4: A3(elm$core$Dict$insert, index, ripple, model.a4)
							})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(
							elm$core$Basics$composeL,
							lift,
							author$project$Internal$TabBar$Model$RippleMsg(index)),
						effects));
			case 1:
				var msgs = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Nothing,
					author$project$Internal$Dispatch$forward(msgs));
			case 0:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 3:
				var geometry = msg.a;
				return _Utils_Tuple2(
					function () {
						var tabBarWidth = geometry.dv.w;
						var scrollAreaWidth = geometry.dk.w;
						var isOverflowing = _Utils_cmp(tabBarWidth, scrollAreaWidth) > 0;
						var translateOffset = (!isOverflowing) ? 0 : model.dH;
						return elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									av: elm$core$Maybe$Just(geometry),
									dH: translateOffset
								}));
					}(),
					elm$core$Platform$Cmd$none);
			default:
				var domId = msg.a;
				var tab_index = msg.b;
				var scrollPosition = msg.c;
				var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$TabBar$Model$defaultGeometry, model.av);
				var tabAtIndex = function (i) {
					return A2(
						elm$core$Maybe$withDefault,
						{b$: 0, b0: 0, aj: 0, w: 0},
						elm$core$List$head(
							A2(elm$core$List$drop, i, geometry.bc)));
				};
				var tab_ = tabAtIndex(tab_index);
				var barWidth = geometry.dv.w;
				var next_tab_index = A4(author$project$Internal$TabBar$Implementation$findAdjacentTabIndexClosestToEdge, tab_index, tab_, scrollPosition, barWidth);
				var scrollIncrement = A5(author$project$Internal$TabBar$Implementation$calculateScrollIncrement, geometry, tab_index, next_tab_index, scrollPosition, barWidth);
				var newScrollPosition = (!tab_index) ? 0 : (_Utils_eq(
					tab_index,
					elm$core$List$length(geometry.bc) - 1) ? geometry.dk.w : (scrollPosition + scrollIncrement));
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{n: tab_index})),
					A2(
						elm$core$Task$perform,
						lift,
						A2(
							elm$core$Task$onError,
							function (_n3) {
								return elm$core$Task$succeed(author$project$Internal$TabBar$Model$NoOp);
							},
							A2(
								elm$core$Task$map,
								function (_n2) {
									return author$project$Internal$TabBar$Model$NoOp;
								},
								A3(elm$browser$Browser$Dom$setViewportOf, domId + '__scroll-area', newScrollPosition, 0)))));
		}
	});
var author$project$Internal$TabBar$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$TabBar$Implementation$getSet.cH, author$project$Internal$TabBar$Implementation$getSet.eq, author$project$Internal$Msg$TabBarMsg, author$project$Internal$TabBar$Implementation$update);
var author$project$Internal$Msg$TextFieldMsg = F2(
	function (a, b) {
		return {$: 17, a: a, b: b};
	});
var author$project$Internal$TextField$Model$defaultModel = {bx: false, av: elm$core$Maybe$Nothing, cO: false, bU: elm$core$Maybe$Nothing};
var author$project$Internal$TextField$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.dA;
	},
	F2(
		function (x, c) {
			return _Utils_update(
				c,
				{dA: x});
		}),
	author$project$Internal$TextField$Model$defaultModel);
var author$project$Internal$TextField$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 2:
				var str = msg.a;
				var dirty = str !== '';
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								cO: dirty,
								bU: elm$core$Maybe$Just(str)
							})),
					elm$core$Platform$Cmd$none);
			case 0:
				var geometry = function () {
					var _n1 = model.bU;
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						return model.av;
					}
				}();
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{bx: false, av: geometry})),
					elm$core$Platform$Cmd$none);
			case 1:
				var geometry = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								bx: true,
								av: elm$core$Maybe$Just(geometry)
							})),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(model),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$TextField$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$TextField$Implementation$getSet.cH, author$project$Internal$TextField$Implementation$getSet.eq, author$project$Internal$Msg$TextFieldMsg, author$project$Internal$TextField$Implementation$update);
var author$project$Internal$Msg$ToolbarMsg = F2(
	function (a, b) {
		return {$: 18, a: a, b: b};
	});
var author$project$Internal$Toolbar$Model$defaultModel = {aL: elm$core$Maybe$Nothing, cp: elm$core$Maybe$Nothing, av: elm$core$Maybe$Nothing, dm: 0};
var author$project$Internal$Toolbar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.cf;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{cf: x});
		}),
	author$project$Internal$Toolbar$Model$defaultModel);
var author$project$Internal$Toolbar$Model$defaultCalculations = {bu: 0, cC: 0, b6: 0, cX: 0, eo: 0, dl: 0, dB: 0, dD: 0, bR: 0};
var author$project$Internal$Toolbar$Implementation$initKeyRatio = F2(
	function (config, geometry) {
		var toolbarRowHeight = geometry.b3;
		var toolbarRatio = (!toolbarRowHeight) ? 0 : (geometry.cJ / toolbarRowHeight);
		var firstRowMaxRatio = (!toolbarRowHeight) ? 0 : (geometry.cI / toolbarRowHeight);
		var flexibleExpansionRatio_ = firstRowMaxRatio - 1;
		var maxTranslateYRatio = config.aQ ? (toolbarRatio - firstRowMaxRatio) : 0;
		var scrollThresholdRatio = config.aQ ? (toolbarRatio - 1) : (firstRowMaxRatio - 1);
		return _Utils_update(
			author$project$Internal$Toolbar$Model$defaultCalculations,
			{cC: flexibleExpansionRatio_, cX: maxTranslateYRatio, dl: scrollThresholdRatio, dD: toolbarRatio});
	});
var author$project$Internal$Toolbar$Implementation$setKeyHeights = F2(
	function (geometry, calculations) {
		var toolbarRowHeight = geometry.b3;
		var toolbarHeight = calculations.dD * toolbarRowHeight;
		var scrollThreshold = calculations.dl * toolbarRowHeight;
		var maxTranslateYDistance = calculations.cX * toolbarRowHeight;
		var flexibleExpansionHeight = calculations.cC * toolbarRowHeight;
		return _Utils_update(
			calculations,
			{bu: flexibleExpansionHeight, b6: maxTranslateYDistance, eo: scrollThreshold, dB: toolbarHeight, bR: toolbarRowHeight});
	});
var author$project$Internal$Toolbar$Implementation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var config = msg.a;
				var geometry = msg.b;
				var calculations = A2(
					author$project$Internal$Toolbar$Implementation$setKeyHeights,
					geometry,
					A2(author$project$Internal$Toolbar$Implementation$initKeyRatio, config, geometry));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aL: elm$core$Maybe$Just(calculations),
							cp: elm$core$Maybe$Just(config),
							av: elm$core$Maybe$Just(geometry)
						}),
					elm$core$Platform$Cmd$none);
			case 1:
				var config = msg.a;
				var geometry = msg.b;
				var calculations = A2(
					elm$core$Maybe$map,
					author$project$Internal$Toolbar$Implementation$setKeyHeights(geometry),
					model.aL);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aL: calculations,
							cp: elm$core$Maybe$Just(config),
							av: elm$core$Maybe$Just(geometry)
						}),
					elm$core$Platform$Cmd$none);
			default:
				var config = msg.a;
				var scrollTop = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cp: elm$core$Maybe$Just(config),
							dm: scrollTop
						}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Toolbar$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Toolbar$Implementation$getSet.cH,
	author$project$Internal$Toolbar$Implementation$getSet.eq,
	author$project$Internal$Msg$ToolbarMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Toolbar$Implementation$update));
var author$project$Internal$Msg$TopAppBarMsg = F2(
	function (a, b) {
		return {$: 19, a: a, b: b};
	});
var author$project$Internal$TopAppBar$Model$defaultModel = {K: 0, cP: true, aY: elm$core$Maybe$Nothing, a4: elm$core$Dict$empty, ds: elm$core$Maybe$Nothing, B: elm$core$Maybe$Nothing, bW: true};
var author$project$Internal$TopAppBar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.dF;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{dF: x});
		}),
	author$project$Internal$TopAppBar$Model$defaultModel);
var author$project$Internal$TopAppBar$Implementation$checkForUpdate = function (model) {
	return A2(
		elm$core$Maybe$map,
		function (topAppBarHeight) {
			var offscreenBoundaryTop = -topAppBarHeight;
			var hasAnyPixelsOnscreen = _Utils_cmp(model.K, offscreenBoundaryTop) > 0;
			var hasAnyPixelsOffscreen = model.K < 0;
			var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
			return partiallyShowing ? _Utils_Tuple2(
				_Utils_update(
					model,
					{bW: false}),
				true) : ((!model.bW) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{bW: true}),
				true) : ((!_Utils_eq(model.cP, hasAnyPixelsOnscreen)) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{cP: hasAnyPixelsOnscreen}),
				true) : _Utils_Tuple2(model, false)));
		},
		model.B);
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var author$project$Internal$TopAppBar$Implementation$moveTopAppBar = function (model) {
	return A2(
		elm$core$Maybe$andThen,
		function (_n0) {
			var updatedModel = _n0.a;
			var partiallyShowing = _n0.b;
			return partiallyShowing ? A2(
				elm$core$Maybe$map,
				function (topAppBarHeight) {
					var styleTop = function () {
						var maxTopAppBarHeight = 128;
						return (_Utils_cmp(
							elm$core$Basics$abs(updatedModel.K),
							topAppBarHeight) > 0) ? (-maxTopAppBarHeight) : updatedModel.K;
					}();
					return _Utils_update(
						updatedModel,
						{
							ds: elm$core$Maybe$Just(styleTop)
						});
				},
				updatedModel.B) : elm$core$Maybe$Just(updatedModel);
		},
		author$project$Internal$TopAppBar$Implementation$checkForUpdate(model));
};
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler = F2(
	function (scrollPosition, model) {
		return A2(
			elm$core$Maybe$withDefault,
			model,
			A2(
				elm$core$Maybe$andThen,
				author$project$Internal$TopAppBar$Implementation$moveTopAppBar,
				A2(
					elm$core$Maybe$map,
					function (_n0) {
						var topAppBarHeight = _n0.a;
						var lastScrollPosition = _n0.b;
						var isCurrentlyBeingResized = false;
						var currentScrollPosition = A2(elm$core$Basics$max, scrollPosition, 0);
						var diff = currentScrollPosition - lastScrollPosition;
						var currentAppBarOffsetTop = model.K - diff;
						var updatedAppBarOffsetTop = (!isCurrentlyBeingResized) ? ((currentAppBarOffsetTop > 0) ? 0 : ((_Utils_cmp(
							elm$core$Basics$abs(currentAppBarOffsetTop),
							topAppBarHeight) > 0) ? (-topAppBarHeight) : currentAppBarOffsetTop)) : model.K;
						var updatedModel = _Utils_update(
							model,
							{
								K: updatedAppBarOffsetTop,
								aY: elm$core$Maybe$Just(currentScrollPosition)
							});
						return A2(
							elm$core$Maybe$withDefault,
							updatedModel,
							author$project$Internal$TopAppBar$Implementation$moveTopAppBar(updatedModel));
					},
					A3(
						elm$core$Maybe$map2,
						F2(
							function (topAppBarHeight, lastScrollPosition) {
								return _Utils_Tuple2(topAppBarHeight, lastScrollPosition);
							}),
						model.B,
						model.aY))));
	});
var author$project$Internal$TopAppBar$Model$RippleMsg = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Internal$TopAppBar$Implementation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var index = msg.a;
				var msg_ = msg.b;
				var _n1 = A2(
					author$project$Internal$Ripple$Implementation$update,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Ripple$Model$defaultModel,
						A2(elm$core$Dict$get, index, model.a4)));
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a4: A3(elm$core$Dict$insert, index, ripple, model.a4)
						}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Internal$TopAppBar$Model$RippleMsg(index),
						effects));
			case 1:
				var scrollPosition = msg.a.aD;
				var topAppBarHeight = msg.a.B;
				return _Utils_Tuple2(
					A2(
						author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler,
						scrollPosition,
						_Utils_update(
							model,
							{
								aY: elm$core$Maybe$Just(scrollPosition),
								B: elm$core$Maybe$Just(topAppBarHeight)
							})),
					elm$core$Platform$Cmd$none);
			case 3:
				var scrollPosition = msg.a.aD;
				return _Utils_Tuple2(
					A2(author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler, scrollPosition, model),
					elm$core$Platform$Cmd$none);
			default:
				var scrollPosition = msg.a.aD;
				var topAppBarHeight = msg.a.B;
				var currentHeight = topAppBarHeight;
				var currentAppBarOffsetTop = model.K - (topAppBarHeight - currentHeight);
				var updatedModel = (!_Utils_eq(
					elm$core$Maybe$Just(topAppBarHeight),
					model.B)) ? _Utils_update(
					model,
					{
						K: currentAppBarOffsetTop,
						B: elm$core$Maybe$Just(currentHeight),
						bW: false
					}) : model;
				return _Utils_Tuple2(
					A2(author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler, scrollPosition, updatedModel),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$TopAppBar$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$TopAppBar$Implementation$getSet.cH,
	author$project$Internal$TopAppBar$Implementation$getSet.eq,
	author$project$Internal$Msg$TopAppBarMsg,
	author$project$Internal$Component$generalise(author$project$Internal$TopAppBar$Implementation$update));
var author$project$Material$update_ = F3(
	function (lift, msg, store) {
		switch (msg.$) {
			case 0:
				var msgs = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Nothing,
					author$project$Internal$Dispatch$forward(msgs));
			case 1:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Button$Implementation$react, lift, msg_, idx, store);
			case 2:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Checkbox$Implementation$react, lift, msg_, idx, store);
			case 3:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Chip$Implementation$react, lift, msg_, idx, store);
			case 4:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Dialog$Implementation$react, lift, msg_, idx, store);
			case 5:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Drawer$Implementation$react, lift, msg_, idx, store);
			case 6:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Fab$Implementation$react, lift, msg_, idx, store);
			case 7:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$IconButton$Implementation$react, lift, msg_, idx, store);
			case 8:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$List$Implementation$react, lift, msg_, idx, store);
			case 9:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Menu$Implementation$react, lift, msg_, idx, store);
			case 10:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$RadioButton$Implementation$react, lift, msg_, idx, store);
			case 11:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Ripple$Implementation$react, lift, msg_, idx, store);
			case 12:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Select$Implementation$react, lift, msg_, idx, store);
			case 13:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Slider$Implementation$react, lift, msg_, idx, store);
			case 14:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Snackbar$Implementation$react, lift, msg_, idx, store);
			case 15:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Switch$Implementation$react, lift, msg_, idx, store);
			case 16:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$TabBar$Implementation$react, lift, msg_, idx, store);
			case 17:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$TextField$Implementation$react, lift, msg_, idx, store);
			case 18:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Toolbar$Implementation$react, lift, msg_, idx, store);
			default:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$TopAppBar$Implementation$react, lift, msg_, idx, store);
		}
	});
var author$project$Material$update = F3(
	function (lift, msg, container) {
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Maybe$withDefault(container),
			A2(
				elm$core$Tuple$mapFirst,
				elm$core$Maybe$map(
					function (mdc) {
						return _Utils_update(
							container,
							{ay: mdc});
					}),
				A3(
					author$project$Material$update_,
					lift,
					msg,
					function ($) {
						return $.ay;
					}(container))));
	});
var author$project$Main$update = F2(
	function (msg, model) {
		var instance = model.Y;
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					model,
					A2(elm$core$Task$attempt, author$project$Main$GotServerResponse, author$project$Main$getTestServerResponse));
			case 1:
				var res = msg.a;
				if (!res.$) {
					var rc = res.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Y: function () {
									var _n2 = elm$core$List$head(rc);
									if (!_n2.$) {
										var e = _n2.a;
										var _n3 = elm$core$List$head(e.cq);
										if (!_n3.$) {
											var i = _n3.a;
											return i.Y;
										} else {
											return 'nothing';
										}
									} else {
										return 'nothing';
									}
								}()
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = res.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Y: 'Error: ' + author$project$Main$httpErrorToString(err)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 2:
				var msg_ = msg.a;
				return A3(author$project$Material$update, author$project$Main$Mdc, msg_, model);
			default:
				var index = msg.a;
				var msg_ = msg.b;
				var tstate = A2(
					author$project$Main$updateTABState,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Main$defaultTABState,
						A2(elm$core$Dict$get, index, model.aw)));
				var tstates = A3(elm$core$Dict$insert, index, tstate, model.aw);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aw: tstates}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Main$KickTestServer = {$: 0};
var author$project$Main$iterate = F2(
	function (i, h) {
		return (i < 1) ? _List_fromArray(
			[h]) : A2(
			elm$core$List$cons,
			h,
			A2(author$project$Main$iterate, i - 1, h));
	});
var author$project$Internal$Options$Attribute = function (a) {
	return {$: 2, a: a};
};
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var elm$html$Html$Attributes$map = elm$virtual_dom$VirtualDom$mapAttribute;
var author$project$Internal$Options$attribute = A2(
	elm$core$Basics$composeL,
	author$project$Internal$Options$Attribute,
	elm$html$Html$Attributes$map(elm$core$Basics$never));
var author$project$Material$Options$attribute = author$project$Internal$Options$attribute;
var author$project$Internal$Options$Class = function (a) {
	return {$: 0, a: a};
};
var author$project$Internal$Options$cs = function (c) {
	return author$project$Internal$Options$Class(c);
};
var author$project$Material$Options$cs = author$project$Internal$Options$cs;
var elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Internal$Dispatch$flatten = function (decoders) {
	var tryMergeStep = F3(
		function (value, decoder, result) {
			return A2(
				elm$core$Maybe$withDefault,
				result,
				A2(
					elm$core$Maybe$map,
					function (_n0) {
						var message = _n0.cY;
						var stopPropagation = _n0.dr;
						var preventDefault = _n0.c9;
						return {
							cY: A2(elm$core$List$cons, message, result.cY),
							c9: preventDefault || result.c9,
							dr: stopPropagation || result.dr
						};
					},
					elm$core$Result$toMaybe(
						A2(elm$json$Json$Decode$decodeValue, decoder, value))));
		});
	var tryMerge = function (value) {
		return A3(
			elm$core$List$foldl,
			tryMergeStep(value),
			{cY: _List_Nil, c9: false, dr: false},
			decoders);
	};
	return A2(elm$json$Json$Decode$map, tryMerge, elm$json$Json$Decode$value);
};
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var author$project$Internal$Dispatch$toAttributes = function (_n0) {
	var config = _n0;
	var _n1 = config.b5;
	if (!_n1.$) {
		var lift = _n1.a;
		return A2(
			elm$core$List$map,
			function (_n3) {
				var event = _n3.a;
				var flatDecoder = _n3.b;
				return A2(
					elm$html$Html$Events$custom,
					event,
					lift(flatDecoder));
			},
			elm$core$Dict$toList(
				A2(
					elm$core$Dict$map,
					function (_n2) {
						return author$project$Internal$Dispatch$flatten;
					},
					config.X)));
	} else {
		return A2(
			elm$core$List$concatMap,
			function (_n4) {
				var event = _n4.a;
				var decoders = _n4.b;
				return A2(
					elm$core$List$map,
					elm$html$Html$Events$custom(event),
					decoders);
			},
			elm$core$Dict$toList(config.X));
	}
};
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var author$project$Internal$Options$addAttributes = F2(
	function (summary, attrs) {
		var styleText = A2(
			elm$core$String$join,
			'; ',
			A2(
				elm$core$List$map,
				function (_n0) {
					var key = _n0.a;
					var value = _n0.b;
					return A2(
						elm$core$String$join,
						': ',
						_List_fromArray(
							[key, value]));
				},
				summary.ad));
		var style = (styleText !== '') ? _List_fromArray(
			[
				A2(elm$html$Html$Attributes$attribute, 'style', styleText)
			]) : _List_Nil;
		var all = _Utils_ap(
			summary.ab,
			_Utils_ap(
				style,
				_Utils_ap(
					A2(
						elm$core$List$map,
						elm$html$Html$Attributes$class,
						elm$core$List$reverse(summary.ac)),
					_Utils_ap(
						attrs,
						_Utils_ap(
							summary.ag,
							author$project$Internal$Dispatch$toAttributes(summary.t))))));
		return all;
	});
var author$project$Internal$Dispatch$Config = elm$core$Basics$identity;
var author$project$Internal$Dispatch$defaultConfig = {X: elm$core$Dict$empty, b5: elm$core$Maybe$Nothing};
var author$project$Internal$Options$Summary = F6(
	function (classes, css, attrs, internal, dispatch, config) {
		return {ab: attrs, ac: classes, cp: config, ad: css, t: dispatch, ag: internal};
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var author$project$Internal$Dispatch$add = F3(
	function (event, decoder, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{
				X: A3(
					elm$core$Dict$update,
					event,
					A2(
						elm$core$Basics$composeR,
						elm$core$Maybe$map(
							elm$core$List$cons(decoder)),
						A2(
							elm$core$Basics$composeR,
							elm$core$Maybe$withDefault(
								_List_fromArray(
									[decoder])),
							elm$core$Maybe$Just)),
					config.X)
			});
	});
var author$project$Internal$Dispatch$setLift = F2(
	function (lift, _n0) {
		var decoders = _n0.X;
		return {
			X: decoders,
			b5: elm$core$Maybe$Just(lift)
		};
	});
var author$project$Internal$Options$collect1_ = F2(
	function (options, acc) {
		switch (options.$) {
			case 0:
				var x = options.a;
				return _Utils_update(
					acc,
					{
						ac: A2(elm$core$List$cons, x, acc.ac)
					});
			case 1:
				var x = options.a;
				return _Utils_update(
					acc,
					{
						ad: A2(elm$core$List$cons, x, acc.ad)
					});
			case 2:
				var x = options.a;
				return _Utils_update(
					acc,
					{
						ab: A2(elm$core$List$cons, x, acc.ab)
					});
			case 3:
				var x = options.a;
				return _Utils_update(
					acc,
					{
						ag: A2(elm$core$List$cons, x, acc.ag)
					});
			case 6:
				var event = options.a;
				var decoder = options.b;
				return _Utils_update(
					acc,
					{
						t: A3(author$project$Internal$Dispatch$add, event, decoder, acc.t)
					});
			case 4:
				var opts = options.a;
				return A3(elm$core$List$foldl, author$project$Internal$Options$collect1_, acc, opts);
			case 7:
				var lift = options.a;
				return _Utils_update(
					acc,
					{
						t: A2(author$project$Internal$Dispatch$setLift, lift, acc.t)
					});
			case 5:
				return acc;
			default:
				return acc;
		}
	});
var author$project$Internal$Options$collect_ = A2(
	elm$core$List$foldl,
	author$project$Internal$Options$collect1_,
	A6(author$project$Internal$Options$Summary, _List_Nil, _List_Nil, _List_Nil, _List_Nil, author$project$Internal$Dispatch$defaultConfig, 0));
var author$project$Internal$Options$styled = F2(
	function (ctor, props) {
		return ctor(
			A2(
				author$project$Internal$Options$addAttributes,
				author$project$Internal$Options$collect_(props),
				_List_Nil));
	});
var author$project$Material$Options$styled = author$project$Internal$Options$styled;
var author$project$Internal$Options$None = {$: 8};
var author$project$Internal$Options$nop = author$project$Internal$Options$None;
var author$project$Internal$Options$when = F2(
	function (guard, prop) {
		return guard ? prop : author$project$Internal$Options$nop;
	});
var author$project$Material$Options$when = author$project$Internal$Options$when;
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$Attributes$dir = elm$html$Html$Attributes$stringProperty('dir');
var author$project$Main$topAppBarWrapper = F4(
	function (index, model, options, topappbar) {
		var state = A2(
			elm$core$Maybe$withDefault,
			author$project$Main$defaultTABState,
			A2(elm$core$Dict$get, index, model.aw));
		return A3(
			author$project$Material$Options$styled,
			elm$html$Html$div,
			_List_fromArray(
				[
					author$project$Material$Options$cs('mdc-topappbar-demo'),
					A2(
					author$project$Material$Options$when,
					state.a6,
					author$project$Material$Options$attribute(
						elm$html$Html$Attributes$dir('rtl')))
				]),
			_List_fromArray(
				[topappbar]));
	});
var author$project$Internal$Msg$Dispatch = function (a) {
	return {$: 0, a: a};
};
var author$project$Internal$Options$Lift = function (a) {
	return {$: 7, a: a};
};
var author$project$Internal$Options$dispatch = function (lift) {
	return author$project$Internal$Options$Lift(
		elm$json$Json$Decode$map(
			function (_n0) {
				var message = _n0.cY;
				var stopPropagation = _n0.dr;
				var preventDefault = _n0.c9;
				return {
					cY: lift(
						author$project$Internal$Msg$Dispatch(message)),
					c9: preventDefault,
					dr: stopPropagation
				};
			}));
};
var author$project$Internal$Component$render = F3(
	function (get_model, view, ctor) {
		return F4(
			function (lift, idx, store, options) {
				return A3(
					view,
					A2(
						elm$core$Basics$composeL,
						lift,
						ctor(idx)),
					A2(get_model, idx, store),
					A2(
						elm$core$List$cons,
						author$project$Internal$Options$dispatch(lift),
						options));
			});
	});
var author$project$Internal$Options$Set = function (a) {
	return {$: 5, a: a};
};
var author$project$Internal$Options$option = author$project$Internal$Options$Set;
var author$project$Internal$Icon$Implementation$node = function (ctor) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{bF: ctor});
		});
};
var author$project$Internal$Icon$Implementation$button = author$project$Internal$Icon$Implementation$node('button');
var author$project$Internal$Icon$Implementation$defaultConfig = {bF: 'i'};
var author$project$Internal$Options$collect1 = F2(
	function (opt, acc) {
		switch (opt.$) {
			case 0:
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						ac: A2(elm$core$List$cons, x, acc.ac)
					});
			case 1:
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						ad: A2(elm$core$List$cons, x, acc.ad)
					});
			case 2:
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						ab: A2(elm$core$List$cons, x, acc.ab)
					});
			case 3:
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						ag: A2(elm$core$List$cons, x, acc.ag)
					});
			case 4:
				var opts = opt.a;
				return A3(elm$core$List$foldl, author$project$Internal$Options$collect1, acc, opts);
			case 5:
				var g = opt.a;
				return _Utils_update(
					acc,
					{
						cp: g(acc.cp)
					});
			case 6:
				var event = opt.a;
				var decoder = opt.b;
				return _Utils_update(
					acc,
					{
						t: A3(author$project$Internal$Dispatch$add, event, decoder, acc.t)
					});
			case 7:
				var lift = opt.a;
				return _Utils_update(
					acc,
					{
						t: A2(author$project$Internal$Dispatch$setLift, lift, acc.t)
					});
			default:
				return acc;
		}
	});
var author$project$Internal$Options$recollect = elm$core$List$foldl(author$project$Internal$Options$collect1);
var author$project$Internal$Options$apply = F4(
	function (summary, ctor, options, attrs) {
		return ctor(
			A2(
				author$project$Internal$Options$addAttributes,
				A2(author$project$Internal$Options$recollect, summary, options),
				attrs));
	});
var author$project$Internal$Options$aria = F2(
	function (key, val) {
		return author$project$Internal$Options$Attribute(
			A2(elm$html$Html$Attributes$attribute, 'aria-' + key, val));
	});
var author$project$Internal$Options$collect = A2(
	elm$core$Basics$composeR,
	A5(author$project$Internal$Options$Summary, _List_Nil, _List_Nil, _List_Nil, _List_Nil, author$project$Internal$Dispatch$defaultConfig),
	author$project$Internal$Options$recollect);
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var author$project$Internal$Icon$Implementation$view = F2(
	function (options, name) {
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$Icon$Implementation$defaultConfig, options);
		var config = summary.cp;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$node(config.bF),
			_List_fromArray(
				[
					author$project$Internal$Options$cs('material-icons'),
					A2(author$project$Internal$Options$aria, 'hidden', 'true')
				]),
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(name)
				]));
	});
var author$project$Internal$Options$data = F2(
	function (key, val) {
		return author$project$Internal$Options$Attribute(
			A2(elm$html$Html$Attributes$attribute, 'data-' + key, val));
	});
var author$project$Material$Options$data = author$project$Internal$Options$data;
var author$project$Internal$Options$Many = function (a) {
	return {$: 4, a: a};
};
var author$project$Internal$Options$many = author$project$Internal$Options$Many;
var author$project$Material$Options$many = author$project$Internal$Options$many;
var author$project$Internal$Options$Listener = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var author$project$Internal$Options$on = F2(
	function (event, decodeMessage) {
		return A2(
			author$project$Internal$Options$Listener,
			event,
			A2(
				elm$json$Json$Decode$map,
				function (message) {
					return {cY: message, c9: false, dr: false};
				},
				decodeMessage));
	});
var author$project$Material$Options$on = author$project$Internal$Options$on;
var author$project$Internal$GlobalEvents$listener = F2(
	function (name, decoder) {
		return author$project$Material$Options$many(
			_List_fromArray(
				[
					A2(author$project$Material$Options$on, name, decoder),
					A2(author$project$Material$Options$data, name, '{}')
				]));
	});
var author$project$Internal$GlobalEvents$onTick = author$project$Internal$GlobalEvents$listener('globaltick');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var author$project$Internal$Options$id = A2(elm$core$Basics$composeL, author$project$Internal$Options$Attribute, elm$html$Html$Attributes$id);
var author$project$Internal$Options$CSS = function (a) {
	return {$: 1, a: a};
};
var author$project$Internal$Options$css = F2(
	function (key, value) {
		return author$project$Internal$Options$CSS(
			_Utils_Tuple2(key, value));
	});
var author$project$Internal$Ripple$Model$strings = {eB: '--mdc-ripple-fg-scale', eC: '--mdc-ripple-fg-size', eD: '--mdc-ripple-fg-translate-end', eE: '--mdc-ripple-fg-translate-start', eF: '--mdc-ripple-left', eG: '--mdc-ripple-top'};
var elm$core$Basics$round = _Basics_round;
var author$project$Internal$Ripple$Implementation$cssVariables = F2(
	function (isUnbounded, _n0) {
		var fgScale = _n0.G;
		var translateStart = _n0.T;
		var translateEnd = _n0.S;
		var initialSize = _n0.H;
		var frame = _n0.N;
		var unboundedCoords = isUnbounded ? {
			m: elm$core$Basics$round((frame.dL - initialSize) / 2),
			f: elm$core$Basics$round((frame.c - initialSize) / 2)
		} : {m: 0, f: 0};
		var fgSize = elm$core$String$fromInt(initialSize) + 'px';
		var variables = elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A2(author$project$Internal$Options$css, author$project$Internal$Ripple$Model$strings.eC, fgSize),
						A2(
						author$project$Internal$Options$css,
						author$project$Internal$Ripple$Model$strings.eB,
						elm$core$String$fromFloat(fgScale))
					]),
					isUnbounded ? _List_fromArray(
					[
						A2(
						author$project$Internal$Options$css,
						author$project$Internal$Ripple$Model$strings.eG,
						elm$core$String$fromFloat(unboundedCoords.f) + 'px'),
						A2(
						author$project$Internal$Options$css,
						author$project$Internal$Ripple$Model$strings.eF,
						elm$core$String$fromFloat(unboundedCoords.m) + 'px')
					]) : _List_fromArray(
					[
						A2(author$project$Internal$Options$css, author$project$Internal$Ripple$Model$strings.eE, translateStart),
						A2(author$project$Internal$Options$css, author$project$Internal$Ripple$Model$strings.eD, translateEnd)
					])
				]));
		return variables;
	});
var author$project$Internal$Ripple$Model$Activate0 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Internal$Ripple$Model$Event = F2(
	function (eventType, pagePoint) {
		return {dW: eventType, eh: pagePoint};
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var author$project$Internal$Ripple$Implementation$decodeActivate = function (_n0) {
	var domId = _n0.cv;
	var isUnbounded = _n0.aV;
	var isActivated = _n0.cN;
	var previousActivationEvent = _n0.da;
	var decodePagePoint = A3(
		elm$json$Json$Decode$map2,
		F2(
			function (pageX, pageY) {
				return {c2: pageX, c3: pageY};
			}),
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['pageX']),
			elm$json$Json$Decode$float),
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['pageY']),
			elm$json$Json$Decode$float));
	var firstChangedTouch = A2(
		elm$json$Json$Decode$andThen,
		function (changedTouches) {
			var _n3 = elm$core$List$head(changedTouches);
			if (!_n3.$) {
				var pagePoint = _n3.a;
				return elm$json$Json$Decode$succeed(pagePoint);
			} else {
				return elm$json$Json$Decode$fail('');
			}
		},
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['changedTouches']),
			elm$json$Json$Decode$list(decodePagePoint)));
	var decodeIsSurfaceDisabled = elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				elm$json$Json$Decode$map,
				elm$core$Basics$always(true),
				A2(
					elm$json$Json$Decode$at,
					_List_fromArray(
						['disabled']),
					elm$json$Json$Decode$string)),
				elm$json$Json$Decode$succeed(false)
			]));
	var decodeEventType = A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['type']),
		elm$json$Json$Decode$string);
	var decodeIsSameInteraction = function () {
		if (previousActivationEvent.$ === 1) {
			return elm$json$Json$Decode$succeed(false);
		} else {
			var event = previousActivationEvent.a;
			return A2(
				elm$json$Json$Decode$map,
				elm$core$Basics$eq(event.dW),
				decodeEventType);
		}
	}();
	var decodeEvent = A2(
		elm$json$Json$Decode$andThen,
		function (eventType) {
			if (eventType === 'touchstart') {
				return A2(
					elm$json$Json$Decode$map,
					author$project$Internal$Ripple$Model$Event(eventType),
					firstChangedTouch);
			} else {
				return A2(
					elm$json$Json$Decode$map,
					author$project$Internal$Ripple$Model$Event(eventType),
					decodePagePoint);
			}
		},
		decodeEventType);
	return A2(
		elm$json$Json$Decode$andThen,
		A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(elm$json$Json$Decode$succeed),
			elm$core$Maybe$withDefault(
				elm$json$Json$Decode$fail(''))),
		A4(
			elm$json$Json$Decode$map3,
			F3(
				function (isSurfaceDisabled, isSameInteraction, event) {
					return (isActivated || (isSurfaceDisabled || isSameInteraction)) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
						A2(
							author$project$Internal$Ripple$Model$Activate0,
							domId,
							{b2: event, d8: false, aV: isUnbounded, ch: false}));
				}),
			decodeIsSurfaceDisabled,
			decodeIsSameInteraction,
			decodeEvent));
};
var author$project$Internal$Ripple$Model$ClientRect = F4(
	function (top, left, width, height) {
		return {c: height, m: left, f: top, dL: width};
	});
var debois$elm_dom$DOM$offsetHeight = A2(elm$json$Json$Decode$field, 'offsetHeight', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetLeft = A2(elm$json$Json$Decode$field, 'offsetLeft', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetTop = A2(elm$json$Json$Decode$field, 'offsetTop', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetWidth = A2(elm$json$Json$Decode$field, 'offsetWidth', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$target = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'target', decoder);
};
var elm$json$Json$Decode$map4 = _Json_map4;
var author$project$Internal$Ripple$Implementation$decodeClientRect = debois$elm_dom$DOM$target(
	A5(elm$json$Json$Decode$map4, author$project$Internal$Ripple$Model$ClientRect, debois$elm_dom$DOM$offsetTop, debois$elm_dom$DOM$offsetLeft, debois$elm_dom$DOM$offsetWidth, debois$elm_dom$DOM$offsetHeight));
var author$project$Internal$Ripple$Model$Blur = {$: 1};
var author$project$Internal$Ripple$Model$Deactivate = {$: 6};
var author$project$Internal$Ripple$Model$Focus = {$: 0};
var author$project$Internal$Ripple$Model$SetCssVariables = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var author$project$Internal$Ripple$Model$activationEventTypes = _List_fromArray(
	['touchstart', 'pointerdown', 'mousedown']);
var author$project$Internal$Ripple$Model$cssClasses = {dQ: 'mdc-ripple-upgraded--background-focused', dY: 'mdc-ripple-upgraded--foreground-activation', dZ: 'mdc-ripple-upgraded--foreground-deactivation', en: 'mdc-ripple-upgraded', ey: 'mdc-ripple-upgraded--unbounded'};
var author$project$Internal$Ripple$Model$pointerDeactivationEvents = _List_fromArray(
	['touchend', 'pointerup', 'mouseup']);
var author$project$Internal$Ripple$Implementation$view = F5(
	function (isUnbounded, domId, lift, model, options) {
		var noStyle = elm$html$Html$text('');
		var focusHandler = A2(
			author$project$Internal$Options$on,
			'focus',
			elm$json$Json$Decode$succeed(
				lift(author$project$Internal$Ripple$Model$Focus)));
		var deactivateHandler = function (event) {
			return author$project$Internal$Options$many(
				A2(
					elm$core$List$map,
					function (tipe) {
						return A2(
							author$project$Internal$Options$on,
							tipe,
							elm$json$Json$Decode$succeed(
								lift(author$project$Internal$Ripple$Model$Deactivate)));
					},
					author$project$Internal$Ripple$Model$pointerDeactivationEvents));
		};
		var blurHandler = A2(
			author$project$Internal$Options$on,
			'blur',
			elm$json$Json$Decode$succeed(
				lift(author$project$Internal$Ripple$Model$Blur)));
		var baseProperties = author$project$Internal$Options$many(
			_List_fromArray(
				[
					author$project$Internal$Options$id(domId),
					author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.en),
					A2(
					author$project$Internal$Options$when,
					isUnbounded,
					author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.ey)),
					model.bx ? author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.dQ) : author$project$Internal$Options$nop
				]));
		var baseInteractionHandler = author$project$Internal$Options$many(
			_List_fromArray(
				[focusHandler, blurHandler]));
		var activateHandler = author$project$Internal$Options$many(
			A2(
				elm$core$List$map,
				function (tipe) {
					return A2(
						author$project$Internal$Options$on,
						tipe,
						A2(
							elm$json$Json$Decode$map,
							lift,
							author$project$Internal$Ripple$Implementation$decodeActivate(
								{
									cv: domId,
									cN: function () {
										var _n3 = model.x;
										if (_n3.$ === 1) {
											var activationState = _n3.a;
											return !activationState.bp;
										} else {
											return false;
										}
									}(),
									aV: isUnbounded,
									da: function () {
										var _n4 = model.x;
										if (_n4.$ === 1) {
											var activationEvent = _n4.a.am;
											return activationEvent;
										} else {
											return elm$core$Maybe$Nothing;
										}
									}()
								})));
				},
				author$project$Internal$Ripple$Model$activationEventTypes));
		var _n0 = model.x;
		switch (_n0.$) {
			case 0:
				var interactionHandler = author$project$Internal$Options$many(
					_List_fromArray(
						[baseInteractionHandler, activateHandler]));
				var cssVars = function () {
					var _n1 = model.bZ;
					if (!_n1.$) {
						var clientRect = _n1.a;
						var _n2 = A2(author$project$Internal$Ripple$Implementation$layoutInternal, isUnbounded, clientRect);
						var fgScale = _n2.G;
						var initialSize = _n2.H;
						return A2(
							author$project$Internal$Ripple$Implementation$cssVariables,
							isUnbounded,
							{G: fgScale, N: clientRect, H: initialSize, S: '0px', T: '0px'});
					} else {
						return _List_Nil;
					}
				}();
				var properties = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseProperties,
							author$project$Internal$Options$many(cssVars),
							A2(
							author$project$Internal$Options$when,
							_Utils_eq(model.bZ, elm$core$Maybe$Nothing),
							author$project$Internal$GlobalEvents$onTick(
								A2(
									elm$json$Json$Decode$map,
									A2(
										elm$core$Basics$composeL,
										lift,
										author$project$Internal$Ripple$Model$SetCssVariables(isUnbounded)),
									author$project$Internal$Ripple$Implementation$decodeClientRect)))
						]));
				return {d6: interactionHandler, ej: properties, cd: noStyle};
			case 1:
				var activatedData = _n0.a;
				var interactionHandler = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseInteractionHandler,
							activateHandler,
							deactivateHandler(activatedData.am)
						]));
				var cssVars = A2(
					author$project$Internal$Ripple$Implementation$cssVariables,
					isUnbounded,
					{G: activatedData.G, N: activatedData.N, H: activatedData.H, S: activatedData.S, T: activatedData.T});
				var properties = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseProperties,
							author$project$Internal$Options$many(cssVars),
							author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.dY),
							A2(
							author$project$Internal$Options$when,
							isUnbounded,
							A2(author$project$Internal$Options$data, 'mdc-ripple-is-unbounded', '1'))
						]));
				return {d6: interactionHandler, ej: properties, cd: noStyle};
			default:
				var activatedData = _n0.a;
				var interactionHandler = author$project$Internal$Options$many(
					_List_fromArray(
						[baseInteractionHandler, activateHandler]));
				var cssVars = A2(
					author$project$Internal$Ripple$Implementation$cssVariables,
					isUnbounded,
					{G: activatedData.G, N: activatedData.N, H: activatedData.H, S: activatedData.S, T: activatedData.T});
				var properties = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseProperties,
							author$project$Internal$Options$many(cssVars),
							author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.dZ)
						]));
				return {d6: interactionHandler, ej: properties, cd: noStyle};
		}
	});
var author$project$Internal$TopAppBar$Implementation$actionItemView = F5(
	function (domId, lift, model, options, name) {
		var ripple = A5(
			author$project$Internal$Ripple$Implementation$view,
			true,
			domId,
			A2(
				elm$core$Basics$composeL,
				lift,
				author$project$Internal$TopAppBar$Model$RippleMsg(domId)),
			A2(
				elm$core$Maybe$withDefault,
				author$project$Internal$Ripple$Model$defaultModel,
				A2(elm$core$Dict$get, domId, model.a4)),
			_List_Nil);
		return A2(
			author$project$Internal$Icon$Implementation$view,
			A2(
				elm$core$List$cons,
				author$project$Internal$Icon$Implementation$button,
				A2(
					elm$core$List$cons,
					ripple.d6,
					A2(elm$core$List$cons, ripple.ej, options))),
			name);
	});
var author$project$Internal$TopAppBar$Implementation$actionItem = F2(
	function (lift, index) {
		return A5(
			author$project$Internal$Component$render,
			author$project$Internal$TopAppBar$Implementation$getSet.cH,
			author$project$Internal$TopAppBar$Implementation$actionItemView(index),
			author$project$Internal$Msg$TopAppBarMsg,
			lift,
			index);
	});
var author$project$Material$TopAppBar$actionItem = F5(
	function (lift, index, model, options, name) {
		return A5(
			author$project$Internal$TopAppBar$Implementation$actionItem,
			lift,
			index,
			model,
			A2(
				elm$core$List$cons,
				author$project$Material$Options$cs('mdc-top-app-bar__action-item'),
				options),
			name);
	});
var author$project$Internal$TopAppBar$Implementation$alignEnd = author$project$Internal$Options$cs('mdc-top-app-bar__section--align-end');
var author$project$Material$TopAppBar$alignEnd = author$project$Internal$TopAppBar$Implementation$alignEnd;
var author$project$Internal$TopAppBar$Implementation$alignStart = author$project$Internal$Options$cs('mdc-top-app-bar__section--align-start');
var author$project$Material$TopAppBar$alignStart = author$project$Internal$TopAppBar$Implementation$alignStart;
var author$project$Internal$TopAppBar$Implementation$fixedAdjust = author$project$Internal$Options$cs('mdc-top-app-bar--fixed-adjust');
var author$project$Material$TopAppBar$fixedAdjust = author$project$Internal$TopAppBar$Implementation$fixedAdjust;
var author$project$Internal$TopAppBar$Implementation$hasActionItem = author$project$Internal$Options$cs('mdc-top-app-bar--short-has-action-item');
var author$project$Material$TopAppBar$hasActionItem = author$project$Internal$TopAppBar$Implementation$hasActionItem;
var author$project$Material$TopAppBar$navigationIcon = F5(
	function (lift, index, model, options, name) {
		return A5(
			author$project$Internal$TopAppBar$Implementation$actionItem,
			lift,
			index,
			model,
			A2(
				elm$core$List$cons,
				author$project$Material$Options$cs('mdc-top-app-bar__navigation-icon'),
				options),
			name);
	});
var elm$html$Html$section = _VirtualDom_node('section');
var author$project$Internal$TopAppBar$Implementation$section = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$section,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-top-app-bar__section'),
			options));
};
var author$project$Material$TopAppBar$section = author$project$Internal$TopAppBar$Implementation$section;
var author$project$Internal$TopAppBar$Implementation$short = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{aF: true});
	});
var author$project$Material$TopAppBar$short = author$project$Internal$TopAppBar$Implementation$short;
var elm$html$Html$span = _VirtualDom_node('span');
var author$project$Internal$TopAppBar$Implementation$title = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$span,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-top-app-bar__title'),
			options));
};
var author$project$Material$TopAppBar$title = author$project$Internal$TopAppBar$Implementation$title;
var author$project$Internal$GlobalEvents$onResize = author$project$Internal$GlobalEvents$listener('globalresize');
var author$project$Internal$GlobalEvents$onScroll = author$project$Internal$GlobalEvents$listener('globalscroll');
var author$project$Internal$TopAppBar$Implementation$cssClasses = {bn: 'mdc-top-app-bar--short-collapsed', bq: 'mdc-top-app-bar--dense', ae: 'mdc-top-app-bar--fixed', bL: 'mdc-top-app-bar--prominent', dn: 'mdc-top-app-bar--fixed-scrolled', aF: 'mdc-top-app-bar--short'};
var author$project$Internal$TopAppBar$Implementation$getAppBarHeight = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'clientHeight']),
	elm$json$Json$Decode$float);
var author$project$Internal$TopAppBar$Implementation$getViewportScrollY = debois$elm_dom$DOM$target(
	A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['ownerDocument', 'defaultView', 'scrollY']),
		elm$json$Json$Decode$float));
var author$project$Internal$TopAppBar$Implementation$row = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-top-app-bar__row'),
			options));
};
var author$project$Internal$TopAppBar$Model$Init = function (a) {
	return {$: 1, a: a};
};
var author$project$Internal$TopAppBar$Model$Resize = function (a) {
	return {$: 2, a: a};
};
var author$project$Internal$TopAppBar$Model$Scroll = function (a) {
	return {$: 3, a: a};
};
var author$project$Internal$TopAppBar$Model$defaultConfig = {bn: false, bq: false, ae: false, bL: false, aF: false};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$html$Html$header = _VirtualDom_node('header');
var author$project$Internal$TopAppBar$Implementation$topAppBar = F4(
	function (lift, model, options, sections) {
		var top = A2(elm$core$Maybe$withDefault, 0, model.ds);
		var lastScrollPosition = A2(elm$core$Maybe$withDefault, 0, model.aY);
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$TopAppBar$Model$defaultConfig, options);
		var config = summary.cp;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$header,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-top-app-bar'),
					A2(
					author$project$Internal$Options$when,
					config.bq,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.bq)),
					A2(
					author$project$Internal$Options$when,
					config.ae,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.ae)),
					A2(
					author$project$Internal$Options$when,
					config.ae && (lastScrollPosition > 0),
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.dn)),
					A2(
					author$project$Internal$Options$when,
					config.bL,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.bL)),
					A2(
					author$project$Internal$Options$when,
					config.aF,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.aF)),
					A2(
					author$project$Internal$Options$when,
					config.bn || (config.aF && (lastScrollPosition > 0)),
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.bn)),
					A2(
					author$project$Internal$Options$when,
					(!config.ae) && (!config.aF),
					A2(
						author$project$Internal$Options$css,
						'top',
						elm$core$String$fromFloat(top) + 'px')),
					author$project$Internal$GlobalEvents$onScroll(
					A2(
						elm$json$Json$Decode$map,
						lift,
						A2(
							elm$json$Json$Decode$map,
							function (scrollPosition) {
								return author$project$Internal$TopAppBar$Model$Scroll(
									{aD: scrollPosition});
							},
							author$project$Internal$TopAppBar$Implementation$getViewportScrollY))),
					author$project$Internal$GlobalEvents$onResize(
					A2(
						elm$json$Json$Decode$map,
						lift,
						A3(
							elm$json$Json$Decode$map2,
							F2(
								function (scrollPosition, topAppBarHeight) {
									return author$project$Internal$TopAppBar$Model$Resize(
										{aD: scrollPosition, B: topAppBarHeight});
								}),
							author$project$Internal$TopAppBar$Implementation$getViewportScrollY,
							author$project$Internal$TopAppBar$Implementation$getAppBarHeight))),
					A2(
					author$project$Internal$Options$when,
					A2(
						elm$core$List$any,
						elm$core$Basics$identity,
						_List_fromArray(
							[
								_Utils_eq(model.aY, elm$core$Maybe$Nothing),
								_Utils_eq(model.B, elm$core$Maybe$Nothing)
							])),
					author$project$Internal$GlobalEvents$onTick(
						A2(
							elm$json$Json$Decode$map,
							lift,
							A3(
								elm$json$Json$Decode$map2,
								F2(
									function (scrollPosition, topAppBarHeight) {
										return author$project$Internal$TopAppBar$Model$Init(
											{aD: scrollPosition, B: topAppBarHeight});
									}),
								author$project$Internal$TopAppBar$Implementation$getViewportScrollY,
								author$project$Internal$TopAppBar$Implementation$getAppBarHeight))))
				]),
			_List_Nil,
			_List_fromArray(
				[
					A2(author$project$Internal$TopAppBar$Implementation$row, _List_Nil, sections)
				]));
	});
var author$project$Internal$TopAppBar$Implementation$view = A3(author$project$Internal$Component$render, author$project$Internal$TopAppBar$Implementation$getSet.cH, author$project$Internal$TopAppBar$Implementation$topAppBar, author$project$Internal$Msg$TopAppBarMsg);
var author$project$Material$TopAppBar$view = author$project$Internal$TopAppBar$Implementation$view;
var author$project$Main$shortTopAppBar = F2(
	function (index, model) {
		return A4(
			author$project$Main$topAppBarWrapper,
			index,
			model,
			_List_fromArray(
				[author$project$Material$TopAppBar$fixedAdjust]),
			A5(
				author$project$Material$TopAppBar$view,
				author$project$Main$Mdc,
				index,
				model.ay,
				_List_fromArray(
					[
						author$project$Material$TopAppBar$short,
						author$project$Material$TopAppBar$hasActionItem,
						author$project$Material$Options$cs('black')
					]),
				_List_fromArray(
					[
						A2(
						author$project$Material$TopAppBar$section,
						_List_fromArray(
							[author$project$Material$TopAppBar$alignStart]),
						_List_fromArray(
							[
								A5(author$project$Material$TopAppBar$navigationIcon, author$project$Main$Mdc, index + '-menu', model.ay, _List_Nil, 'menu'),
								A2(
								author$project$Material$TopAppBar$title,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Title')
									]))
							])),
						A2(
						author$project$Material$TopAppBar$section,
						_List_fromArray(
							[author$project$Material$TopAppBar$alignEnd]),
						_List_fromArray(
							[
								A5(author$project$Material$TopAppBar$actionItem, author$project$Main$Mdc, index + '-file_download', model.ay, _List_Nil, 'file_download')
							]))
					])));
	});
var author$project$Internal$Button$Implementation$raised = author$project$Internal$Options$cs('mdc-button--raised');
var author$project$Material$Button$raised = author$project$Internal$Button$Implementation$raised;
var author$project$Internal$Button$Implementation$ripple = author$project$Internal$Options$option(
	function (options) {
		return _Utils_update(
			options,
			{R: true});
	});
var author$project$Material$Button$ripple = author$project$Internal$Button$Implementation$ripple;
var author$project$Internal$Button$Implementation$defaultConfig = {ar: false, by: elm$core$Maybe$Nothing, ax: elm$core$Maybe$Nothing, bG: elm$core$Maybe$Nothing, R: false};
var author$project$Internal$Button$Model$Click = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Internal$Options$onClick = function (msg) {
	return A2(
		author$project$Internal$Options$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$button = _VirtualDom_node('button');
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Internal$Button$Implementation$button = F5(
	function (domId, lift, model, options, nodes) {
		var rippleInterface = A5(
			author$project$Internal$Ripple$Implementation$view,
			false,
			domId,
			A2(elm$core$Basics$composeL, lift, author$project$Internal$Button$Model$RippleMsg),
			model.R,
			_List_Nil);
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$Button$Implementation$defaultConfig, options);
		var config = summary.cp;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			(!_Utils_eq(config.ax, elm$core$Maybe$Nothing)) ? elm$html$Html$a : elm$html$Html$button,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-button'),
					author$project$Internal$Options$cs('mdc-js-button'),
					A2(
					author$project$Internal$Options$when,
					summary.cp.R,
					author$project$Internal$Options$cs('mdc-js-ripple-effect')),
					A2(
					author$project$Internal$Options$when,
					(!_Utils_eq(config.ax, elm$core$Maybe$Nothing)) && (!config.ar),
					author$project$Internal$Options$attribute(
						elm$html$Html$Attributes$href(
							A2(elm$core$Maybe$withDefault, '', config.ax)))),
					A2(
					author$project$Internal$Options$when,
					config.ar,
					author$project$Internal$Options$attribute(
						elm$html$Html$Attributes$disabled(true))),
					A2(
					author$project$Internal$Options$when,
					config.ar,
					author$project$Internal$Options$cs('mdc-button--disabled')),
					A3(
					elm$core$Basics$composeL,
					author$project$Internal$Options$when(config.R),
					author$project$Internal$Options$many,
					_List_fromArray(
						[rippleInterface.d6, rippleInterface.ej])),
					A2(
					elm$core$Maybe$withDefault,
					author$project$Internal$Options$nop,
					A2(
						elm$core$Maybe$map,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, author$project$Internal$Options$onClick, lift),
							author$project$Internal$Button$Model$Click(config.R)),
						config.bG))
				]),
			_List_Nil,
			elm$core$List$concat(
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(
							elm$core$Maybe$map,
							function (icon_) {
								return _List_fromArray(
									[
										A2(
										author$project$Internal$Icon$Implementation$view,
										_List_fromArray(
											[
												author$project$Internal$Options$cs('mdc-button__icon')
											]),
										icon_)
									]);
							},
							config.by)),
						nodes
					])));
	});
var author$project$Internal$Button$Implementation$view = F2(
	function (lift, index) {
		return A5(
			author$project$Internal$Component$render,
			author$project$Internal$Button$Implementation$getSet.cH,
			author$project$Internal$Button$Implementation$button(index),
			author$project$Internal$Msg$ButtonMsg,
			lift,
			index);
	});
var author$project$Material$Button$view = author$project$Internal$Button$Implementation$view;
var author$project$Internal$Card$Implementation$view = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card'),
			options));
};
var author$project$Material$Card$view = author$project$Internal$Card$Implementation$view;
var author$project$Material$Options$css = author$project$Internal$Options$css;
var author$project$Material$Options$onClick = author$project$Internal$Options$onClick;
var author$project$Main$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(author$project$Main$shortTopAppBar, 'top-app-bar-short', model)
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				A2(
					author$project$Main$iterate,
					10,
					A3(
						author$project$Material$Options$styled,
						elm$html$Html$div,
						_List_fromArray(
							[
								A2(author$project$Material$Options$css, 'padding', '1rem'),
								A2(author$project$Material$Options$css, 'text-align', 'center'),
								A2(author$project$Material$Options$css, 'margin-top', '100px')
							]),
						_List_fromArray(
							[
								A2(
								author$project$Material$Card$view,
								_List_fromArray(
									[
										A2(author$project$Material$Options$css, 'width', '80%'),
										A2(author$project$Material$Options$css, 'display', 'inline-block'),
										A2(author$project$Material$Options$css, 'box-sizing', 'border-box'),
										A2(author$project$Material$Options$css, 'height', '100px'),
										A2(author$project$Material$Options$css, 'border', '1px solid #f0f0f0')
									]),
								_List_fromArray(
									[
										A3(
										author$project$Material$Options$styled,
										elm$html$Html$div,
										_List_fromArray(
											[
												A2(author$project$Material$Options$css, 'padding', '1rem')
											]),
										_List_fromArray(
											[
												A5(
												author$project$Material$Button$view,
												author$project$Main$Mdc,
												'my-button',
												model.ay,
												_List_fromArray(
													[
														author$project$Material$Button$ripple,
														author$project$Material$Button$raised,
														author$project$Material$Options$onClick(author$project$Main$KickTestServer),
														author$project$Material$Options$cs('black')
													]),
												_List_fromArray(
													[
														elm$html$Html$text(model.Y)
													]))
											]))
									]))
							]))))
			]));
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{d4: author$project$Main$init, eu: author$project$Main$subscriptions, ez: author$project$Main$update, bV: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));