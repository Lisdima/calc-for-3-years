<template lang="pug">
.options
    .options--headers
        .options--headers__title.title Дополнительные опции
        .options--headers__question.question
          p(@click.stop="$emit('onclick-tooltip-opts')") ?
          span(:class="{'tooltip-active': tooltipOptions}") Сервисы и защита, которую можно подключить
    .options--item
      label.block-checkbox.block-checkbox__option.block-checkbox__disabled Телемедицина 
        b бесплатно
        input(type="checkbox" disabled checked)
        span.checkmark
      .option__description
        span Онлайн-консультации

</template>

<script>
export default {
  props: {
    tooltipOptions: Boolean,
  },
};
</script>

<style lang="scss">
.options {
  max-width: 512px;
  @media (max-width: 1200px) {
    max-width: 266px;
  }
  &--headers {
    display: flex;
    align-items: baseline;
  }
  &--item {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    @media (max-width: 1200px) {
      flex-direction: column;
    }
    .checkmark {
      @media (max-width: 960px) {
        transform: translate(0%, -30%);
      }
    }
    .option__description {
      font-size: 14px;
      line-height: 18px;
      color: #8c959e;
      span {
        vertical-align: sub;
        @media (max-width: 1200px) {
          vertical-align: unset;
          padding-left: 36px;
        }
      }
    }
  }
}
</style>
