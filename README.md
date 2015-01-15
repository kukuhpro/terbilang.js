# terbilang.js

This is Jquery plugin that changed number to text.

Language feature list:

 * Indonesia (id - rupiah)
 * English (en - dollar)


Before added this plugin make sure you are already loaded jquery.

And here's some code!

```javascript
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="terbilang.js"></script>
<script type="text/javascript">
  $('#input').terbilang({
    lang: 'id',
    output: $('#ouput')
  });
</script>
```

sample input

```html
200000
```

sample output

```html
dua ratus ribu rupiah
```
