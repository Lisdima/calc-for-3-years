<template lang="pug">
.calculator
  .calculator--form
      h4.calculator--form__title.title Ежегодный взнос
      input#range-input(
        v-model="sum"
        maxLength="8"
        @focus="clearRubles"
        @blur="addRubles"
        @input="change($event.target.value)"
      )
      .slider-input__terms
        .slider-input__terms-text-l(:class="{'sub-title__error': error}") {{ minValue }}

        .slider-input__terms-text-r(:class="{'sub-title__error': error}") {{ maxValue }}
      //- p.calculator__sub-title.sub-title.sub-title__error(v-else) от 100 000 ₽ до 5 000 000 ₽
  a
    button.btn.payments-block__btn(v-if="width > 959" :disabled="disabled" @click="orderUrl" :class="{'disabled': disabled}") Оформить


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
      type: Number,
    },
    minValue: {
      type: String,
    },
    maxValue: {
      type: String,
    },
    width: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    disabled() {
      const sum = this.sum.replace(/\D/gi, '');
      if (sum < 100000 || sum > 5000000 || this.error) {
        return true;
      }
      return false;
    },
  },
  methods: {
    clearRubles() {
      this.$emit('on-focus', this.sum);
    },
    addRubles() {
      this.$emit('on-blur', this.sum);
    },
    change(e) {
      this.$emit('changeValue', e);
    },
    orderUrl() {
      const sum = this.sum.replace(/\D/gi, '');
      window.location.href = `https://order.renlife.ru/policy/?programBrief=NSZH_FINANCIAL_RENT_DSF_3YEAR&sum=${sum}${window.location.search.replace('?', '&')}`;
      return window.location.href;
    },
  },
};
</script>

<style lang="scss">
.calculator {
  width: 100%;
  @media (max-width: 640px) {
    display: flex;
    max-width: none;
  }

  &--form {
    width: 100%;
    p {
      margin-top: 4px;
    }
  }
  &--form__title {
    margin-bottom: 20px;
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
  .slider-input {
    &__label,
    &__terms {
      color: #8c959e;
      font-size: 14px;
      font-weight: 300;
      line-height: 18px;
      letter-spacing: -0.01em;
    }
    &__terms {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
