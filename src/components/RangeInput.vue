<template lang="pug">
.calculator
  .calculator--form
      h4.calculator--form__title.title Ежегодный взнос
      input#range-input(
        v-model="sum"
        maxLength="7"
        @focus="clearRubles"
        @blur="addRubles"
        @input="change($event.target.value)"
      )
      p.calculator__sub-title.sub-title(v-if="!error") от 100 000 ₽
      p.calculator__sub-title.sub-title.sub-title__error(v-else) от 100 000 ₽ до 5 000 000 ₽
  .calculator--info
    h4.info-title.title Срок программы
    .info-time
      p {{time}} года

</template>

<script>
export default {
  props: {
    sum: {
      type: String,
    },
    error: {
      type: Boolean,
    },
    time: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    clearRubles() {
      this.$emit("on-focus", this.sum);
    },
    addRubles() {
      this.$emit("on-blur", this.sum);
    },
    change(e) {
      this.$emit('changeValue', e)
    }
  },
};
</script>

<style lang="scss">
.calculator {
  max-width: 512px;
  width: 100%;
  @media (max-width: 1200px) {
    max-width: 266px;
  }
  @media (max-width: 640px) {
    display: flex;
    max-width: none;
  }

  &--form {
    width: 100%;
    margin-bottom: 32px;
    @media (max-width: 640px) {
      width: 47%;
    }
    p {
      margin-top: 4px;
    }
  }
  &--form__title {
    margin-bottom: 4px;
  }
  &__subtitle {
    margin-top: 4px;
  }
  &--info {
    @media (max-width: 640px) {
      margin-left: 32px;
    }
    .info-time {
      margin-top: 6px;
    }
    p {
      font-size: 16px;
      line-height: 24px;
      max-width: 71px;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 5px 6px 6px 15px;
      background: #28323c;
      color: #ffffff;
    }
  }
}
</style>
