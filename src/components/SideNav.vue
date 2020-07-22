<template>
  <v-list class="fill-height" width="54px">
    <v-list-item
      v-for="(item, index) in items"
      v-bind:key="index"
      @click="$emit('onClickItem', index)"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
            <v-list-item-action v-on="on" v-bind="attrs">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
        </template>
        <span>{{ item.title }}</span>
      </v-tooltip>
      <v-list-item-content></v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "SideNav",
  props: ["items"],
  data() {
    return {};
  },
};
</script>

<style></style>
