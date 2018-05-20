# jscodeshift-recipes

A collection of [jscodeshift](https://github.com/facebook/jscodeshift) recipes.

## Execute a recipe

A recipe can be applied by executing jscodeshift:

```
jscodeshift -t RECIPE.js TARGET_DIR/
```

E.g.:

```
jscodeshift -t src/qunit-assert-equal-to-strictEqual.js foo/src
```

## License (GPLv3)

© Stephen Niedzielski.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see <http://www.gnu.org/licenses/>.
